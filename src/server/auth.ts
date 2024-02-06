import { PrismaAdapter } from "@next-auth/prisma-adapter"
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth"
import { prisma } from "@/server/db"

import CredentialsProvider from "next-auth/providers/credentials"
import { validateSms } from "@/server/sms"
import { MyUser, userSlice } from "@/ds/user"
import { DefaultJWT } from "next-auth/jwt"

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
    user: DefaultSession["user"] & MyUser
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
      const userInDB = await prisma.user.findUnique({
        where: { id: token.sub },
      })
      if (userInDB) {
        console.log("-- add phone")
        token.phone = userInDB.phone
      } else {
        console.warn("-- invalidate user")
        token.iat = Date.now() / 1000
        // token.expires // todo: 可能修改 expires 就可以让 前台的 session 变得 unauthenticated 了
      }
      // console.log("-- jwt: ", { token, user, userInDB, session })
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
      // console.log("-- session: ", { session, user, token });
      const phone = token.phone

      let userInDB
      if (phone) {
        userInDB = await prisma.user.findUnique({
          where: {
            phone,
          },
          ...userSlice,
        })

        if (userInDB) {
          session.user = {
            ...session.user,
            ...userInDB,
          }
        }
      }

      // console.log("-- session: ", { phone, user, userInDB, session })
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
        console.log("-- authorize: ", credentials)
        // Here you should verify the phone number and the code
        // For example, check against a database where you stored the code
        if (!credentials) throw new Error("验证信息为空！")

        const { phone, code } = credentials
        if (!phone || !code) throw new Error("验证信息错误！")

        const user = await validateSms({ phone, code })
        if (!user) throw new Error("Phone number or code is incorrect")
        return user
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
