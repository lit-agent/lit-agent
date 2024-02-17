import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
  DefaultUser,
} from "next-auth"
import { prisma } from "@/lib/db"

import { IUserListView } from "@/schema/user.base"
import { DefaultJWT } from "next-auth/jwt"
import { LOG_AUTH_ENABLED } from "@/config"
import { WX_APP_ID, WX_APP_SECRET } from "@/lib/wx/config"
import { SmsProvider } from "@/lib/sms/provider"
import WechatProvider from "@/lib/wx/provider"
import { boolean } from "zod/lib/types"

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

  interface User extends DefaultUser {
    phone?: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  debug: false,

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
      if (user.phone) token = { ...token, phone: user.phone, validated: false }
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

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
