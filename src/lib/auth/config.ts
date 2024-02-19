import { NextAuthOptions } from "next-auth"
import { LOG_AUTH_ENABLED } from "@/config"
import { prisma } from "@/lib/db"
import { userMainViewSchema } from "@/schema/user"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { SmsProvider } from "@/lib/sms/provider"
import WechatProvider from "@/lib/wechat/auth/provider"
import { WX_APP_ID, WX_APP_SECRET } from "@/lib/wechat/config"

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: LOG_AUTH_ENABLED,

  pages: {
    // signIn: "/intro",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 一周
  },

  callbacks: {
    signIn: async ({ user, email, account, profile, credentials }) => {
      /* on successful sign in */
      console.debug("[auth.signIn]: ", {
        user,
        email,
        account,
        profile,
        credentials,
      })

      return Promise.resolve(true)
    },

    redirect: async (params) => {
      // console.debug("[auth.redirect]: ", params)
      return params.url
    },
    /**
     * 【user --> token（JWT）】
     * signIn（首次登录）会触发 CredentialProvider.authorize()
     * 在那里，验证完用户信息（phone+sms）后返回 user 传到 jwt 函数里
     * 我们再把它传给 token
     * token 会持久化在浏览器里（基于某种编码）
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

      // 首次登录
      if (user)
        token = {
          sub: user.id,
          name: user.name,
          picture: user.image,
          email: user.email,
          validated: user.validated,
        }

      // 绑定额外登录
      if (profile) {
        token.name = profile.name
        token.picture = profile.image
      }

      if (LOG_AUTH_ENABLED)
        console.debug(`[auth.jwt]: `, {
          token,
          user,
          isNewUser,
          profile,
          trigger,
          account,
          session,
        })

      return token
    },

    /**
     * 【token --> db --> session】
     * 每次都会从 jwt 函数拿回 token 塞给 session
     * 客户端基于 session.user 拿到用户的限权数据
     * 同时我们在 SafeSessionProvider 里全局监控 session.error
     * 一旦出现问题，我们就强制用户在客户端退出登录
     */
    session: async ({ session, user, token, trigger, newSession }) => {
      const id = token.sub
      if (!id) {
        session.error = "NoUserInToken"
        session.expires = new Date().toISOString()
      } else {
        const userInDB = await prisma.user.findUnique({
          where: { id },
        })
        if (!userInDB) {
          session.error = "NoUserInDB"
          session.expires = new Date().toISOString()
        } else {
          session.user = {
            id,
            name: userInDB.name,
            image: userInDB.image,
            email: userInDB.email,
            validated: userInDB.validated,
          }
        }
      }

      if (LOG_AUTH_ENABLED)
        console.debug(
          `[auth.session] User(id=${id}, validated=${session.user.validated}), trigger=${trigger}, expires=${session.expires}\n---`,
        )

      return session
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */

    SmsProvider,

    WechatProvider({
      clientId: WX_APP_ID,
      clientSecret: WX_APP_SECRET,
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID!,
    //   clientSecret: env.DISCORD_CLIENT_SECRET!,
    // }),
  ],
}
