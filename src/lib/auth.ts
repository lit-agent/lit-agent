import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
  Profile,
} from "next-auth"
import { prisma } from "@/lib/db"

import CredentialsProvider from "next-auth/providers/credentials"

import { SMS_PROVIDER_ID } from "@/lib/sms"
import { IUserListView } from "@/schema/user.base"
import { userMainViewSchema } from "@/schema/user"
import { DefaultJWT } from "next-auth/jwt"
import { LOG_AUTH_ENABLED } from "@/config"
import {
  WX_APP_ID,
  WX_APP_SECRET,
  WX_GET_ACCESS_TOKEN_URL,
  WX_GET_CODE_URL,
  WX_GET_USER_INFO_URL,
  WX_PROVIDER_ID,
  WX_PROVIDER_TYPE,
  WX_REDIRECT_URL,
} from "@/lib/wx/config"
import { WxAuthScopeType } from "@/lib/wx/schema"
import { getWxAuthorizationUrl } from "@/lib/wx/utils"
import { IWxProfile } from "@/lib/wx/functions/get-user-info"
import { getWxAccessToken } from "@/lib/wx/functions/get-access-token"
import log from "logging-service"

export type SessionError = "NoPhone" | "NoUserInDB"

interface Payload {
  id: string
  validated: boolean
  name: string | null // JWT 的 name 还支持 undefined，我们要限制一下
  phone: string | null
  error?: SessionError
}

// ref: https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT, IUserListView, Payload {}
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & Payload
  }

  interface User extends Payload {}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: true,

  logger: {
    error(code, metadata) {
      log.error(code, metadata)
    },
    warn(code) {
      log.warn(code)
    },
    debug(code, metadata) {
      log.debug(code, metadata)
    },
  },

  pages: {
    // signIn: "/intro",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 一周
  },

  callbacks: {
    /**
     * 【user --> token（JWT）】
     * signIn（首次登录）会触发 CredentialProvider.authorize()
     * 在那里，验证完用户信息（phone+sms）后返回 user 传到 jwt 函数里
     * 我们再把它传给 token
     * token 会持久化在浏览器里（基于某种编码）
     *
     * @param token
     * @param user
     * @param session
     * @param trigger
     * @param account
     * @param profile
     */
    jwt: async ({
      token,
      user,
      session,
      trigger,
      account,
      profile,
      isNewUser,
    }) => {
      // token 是加解密可信安全的，不用担心被篡改！

      if (token.sub) token.id = token.sub

      let userInDB
      let status = ""
      if (user) token = { ...token, phone: user.phone, validated: false }
      // afterwards
      else if (token.phone) {
        // 首次更新token
        userInDB = await prisma.user.findUnique({
          where: { phone: token.phone },
        })
        if (!userInDB) {
          token.expiresIn = Date.now() / 1e3
          token.error = "NoUserInDB"
          status = "invalidated"
          // console.debug("[auth.jwt] updated(invalidating): ", { userInDB, token, })
        } else if (userInDB.validated) {
          token.validated = true
          status = "validated"
          token = { ...token, ...userInDB }
        } else {
          status = "ok"
        }
      }

      if (LOG_AUTH_ENABLED)
        console.debug(`[auth.jwt]: `, { status, user, userInDB, token })

      return token
    },

    /**
     * 【token --> db --> session】
     * 每次都会从 jwt 函数拿回 token 塞给 session
     * 客户端基于 session.user 拿到用户的限权数据
     * 同时我们在 SafeSessionProvider 里全局监控 session.error
     * 一旦出现问题，我们就强制用户在客户端退出登录
     *
     * @param session
     * @param user
     * @param token
     * @param trigger
     * @param newSession
     */
    session: async ({ session, user, token, trigger, newSession }) => {
      if (token.sub) {
        session.user = { ...session.user, ...token }
      }

      if (LOG_AUTH_ENABLED)
        console.debug("[auth.session]: ", {
          session,
          user,
          token,
          newSession,
          trigger,
        })

      return session
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "sms",
      name: "sms",
      credentials: {
        phone: { label: "Phone Number", placeholder: "+123456789" },
        code: { label: "Verification Code", type: "text" },
      },

      /**
       * 登录的时候会调用这个函数，返回的结果会存入 jwt 回调的 user 内
       */
      authorize: async (credentials) => {
        if (LOG_AUTH_ENABLED) console.log("[Auth] authorizing: ", credentials)

        if (!credentials) throw new Error("验证信息不能为空（1）！")

        const { phone, code } = credentials
        if (!phone || !code) throw new Error("验证信息不能为空（2）！")

        // 在发送验证码的时候，手机号与验证码等信息已经入表，此时只要验证账号是否存在即可
        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: SMS_PROVIDER_ID,
              providerAccountId: phone,
            },
          },
          include: {
            user: userMainViewSchema,
          },
        })

        if (LOG_AUTH_ENABLED) console.log("[sms] account: ", account)

        if (
          // 不存在
          !account ||
          // todo: 过期
          // getTimeS() > account.expires_at! ||
          // 错误
          account.access_token !== code
        ) {
          return null
        }

        return account.user
      },
    }),

    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID!,
    //   clientSecret: env.DISCORD_CLIENT_SECRET!,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * ref: https://github.com/nextauthjs/next-auth/issues/5937
 */
authOptions.providers.push({
  id: WX_PROVIDER_ID,
  name: "Wechat Web",
  type: "oauth",

  // 这两个必须要有，会在oauth的框架逻辑里被检查
  clientId: WX_APP_ID,
  clientSecret: WX_APP_SECRET,

  // todo: investigate
  checks: ["state"],

  /**
   * Step 1. 基于前端拿到 code
   * eg. https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx807d86fb6b3d4fd2&redirect_uri=http%3A%2F%2Fdevelopers.weixin.qq.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
   */
  authorization: {
    // todo: 为什么拼接 url 会导致 scope === "openid"?
    // url: getWxAuthorizationUrl(WxAuthScopeType.info),
    url: WX_GET_CODE_URL + "#wechat_redirect",
    params: {
      appid: WX_APP_ID,
      redirect_uri: encodeURI(WX_REDIRECT_URL),
      response_type: "code",
      scope: WxAuthScopeType.info,
      state: "",
      forcePopup: true,
    },
  },

  /**
   * Step 2. 基于 code 拿到 access_token
   * e.g. ?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
   */
  token: {
    url: WX_GET_ACCESS_TOKEN_URL,
    params: {
      appid: WX_APP_ID,
      secret: WX_APP_SECRET,
      grant_type: "authorization_code",
    },
    // async request({ provider, client, params, checks }) {
    //   // return {tokens: await getWxAccessToken()}
    //   console.log("[wx-auth] token: ", { provider, params, client, checks })
    //   return { tokens: {} }
    // },
  },

  /**
   * Step 3. 基于 access_token 拿到 用户信息
   * e.g. `?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
   */
  userinfo: {
    url: WX_GET_USER_INFO_URL,
    params: {
      lang: "zh_CN",
    },
    async request({ provider, tokens, client }) {
      // return {tokens: await getWxAccessToken()}
      console.log("[wx-auth] token params: ", provider.token!.params)
      console.log("[wx-auth] userinfo: ", { provider, client, tokens })
      // return client.userinfo(tokens.access_token, {
      //   params: {
      //     openid:
      //   }
      // })
      return {}
    },
  },

  /**
   * 4. 基于 返回的 用户信息，生成与 next-auth 框架一致的 user 数据结构
   */
  async profile(profile: IWxProfile, tokens) {
    console.log("[wx-auth] profile: ", { profile, tokens })
    return { id: "", validated: false, phone: "" } //updateWxProfile(profile)
  },
})

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)

export const getServerUser = async () => (await getServerAuthSession())?.user

export const ensureServerUser = async () => {
  const user = await getServerUser()
  if (!user) throw new Error("no user found")
  return user
}

const updateWxProfile = async (profile: IWxProfile) => {
  const account = await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: WX_PROVIDER_ID,
        providerAccountId: profile.openid,
      },
    },
    create: {
      provider: WX_PROVIDER_ID,
      providerAccountId: profile.openid,
      user: {
        create: {
          name: profile.nickname,
          image: profile.headimgurl,
        },
      },
      type: WX_PROVIDER_TYPE,
    },
    update: {
      user: {
        update: {
          name: profile.nickname,
          image: profile.headimgurl,
        },
      },
    },
    include: {
      user: true,
    },
  })
  return account.user
}
