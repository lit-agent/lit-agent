import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { prisma } from "@/lib/db"

import CredentialsProvider from "next-auth/providers/credentials"

import { SMS_PROVIDER_ID } from "@/lib/sms"
import { IUserListView } from "@/schema/user.base"
import { userMainViewSchema } from "@/schema/user"

export type SessionError = "NoPhone" | "NoUserInDB"

// ref: https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends IUserListView {
    name: string | null // JWT 的 name 还支持 undefined，我们要限制一下
    phone: string | null
    validated: boolean
  }
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & { id: string; validated: boolean }
    error?: SessionError
  }

  interface User {
    phone: string | null
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/intro",
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
      console.log(
        `[auth.jwt] user(id=${token.sub}, phone=${token.phone}, name=${token.name}, validated=${token.validated})`,
      )
      // console.log("[auth.jwt]: ", { token, user, session, account, profile })

      // token 是加解密可信安全的，不用担心被篡改！
      // init
      if (user) token = { ...token, phone: user.phone, validated: false }
      // afterwards
      else if (token.phone && !token.validated) {
        // 首次更新token
        const userInDB = await prisma.user.findUniqueOrThrow({
          where: { phone: token.phone },
        })
        if (userInDB.validated) token.validated = true
        console.log("[auth.jwt] updated: ", { userInDB, token })
      }

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
      // console.log("[auth.session]: ", {
      //   session,
      //   user,
      //   token,
      //   newSession,
      //   trigger,
      // })

      if (token.sub) {
        session.user.id = token.sub
        session.user.validated = token.validated
      }

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
        console.log("[Auth] authorizing: ", credentials)
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
        console.log("[sms] account: ", account)

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
