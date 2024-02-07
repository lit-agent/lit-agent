import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { prisma } from "@/lib/db"

import CredentialsProvider from "next-auth/providers/credentials"
import { IMainUser, mainUserSlice } from "@/schema/user"

import { SMS_PROVIDER_ID } from "@/lib/sms"

// ref: https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    phone: string | null
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
    user: DefaultSession["user"] & IMainUser
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  //   phone?: string
  // }
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
    jwt: async ({ token, user, session, trigger, account, profile }) => {
      let message = ""

      if (token.phone) message += "✅ cached by phone"
      else {
        const userInDB = await prisma.user.findUnique({
          where: { id: token.sub },
        })
        if (userInDB) {
          message = "✅ authenticated"
          token.phone = userInDB.phone
        } else {
          message = "❌ invalidated"
          token.iat = Date.now() / 1000
          // token.expires // todo: 可能修改 expires 就可以让 前台的 session 变得 unauthenticated 了
        }
      }
      console.log("[auth.jwt]: ", message)

      // console.log("[auth.jwt]: ", { token, user, userInDB, session })
      return token
    },
    /**
     *  参考：https://stackoverflow.com/a/77018015
     *   session: {
     *     user: { name: '17766091857', email: null, image: null },
     *     expires: '2024-02-08T07:38:45.489Z'
     *   },
     * @param session
     * @param user
     */
    session: async ({ session, user, token, trigger, newSession }) => {
      const phone = token.phone
      const sessionUser = session.user
      // console.log("[auth.session]: ", { sessionUser, user, token })

      if (!phone)
        console.error(
          "[auth.session] ❌ no phone in token (todo: how to invalidate user) ",
        )
      else {
        const userInDB = await prisma.user.findUnique({
          where: {
            phone,
          },
          ...mainUserSlice,
        })

        if (!userInDB) {
          console.error(
            "[auth.session] ❌ no user in db (todo: how to invalidate user) ",
          )
        } else {
          session = { ...session, user: userInDB }
          console.log("[auth.session] update session's user from db")
        }
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

      authorize: async (credentials) => {
        console.log("[Auth] authorizing: ", credentials)
        // Here you should verify the phone number and the code
        // For example, check against a database where you stored the code
        if (!credentials) throw new Error("验证信息为空！")

        const { phone, code } = credentials
        if (!phone || !code) throw new Error("验证信息错误！")

        const account = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: SMS_PROVIDER_ID,
              providerAccountId: phone,
            },
          },
          include: {
            user: mainUserSlice,
          },
        })
        console.log("[sms] validating account: ", account)

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
