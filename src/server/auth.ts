import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { prisma } from "@/server/db";

import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import { validateSms } from "@/server/sms";
import { env } from "@/env";
import { $Enums } from ".prisma/client";

import UserType = $Enums.UserType;
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string;
      validated?: boolean;
      phone?: string;
      type: UserType;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
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
    /**
     *  参考：https://stackoverflow.com/a/77018015
     *   session: {
     *     user: { name: '17766091857', email: null, image: null },
     *     expires: '2024-02-08T07:38:45.489Z'
     *   },
     * @param session
     * @param user
     */
    session: async ({ session, user }) => {
      const userInDB = await prisma.user.findUnique({
        where: {
          phone: session.user.name!,
        },
      });
      const newSession = {
        ...session,
        user: {
          ...session.user,
          id: userInDB?.id,
          name: userInDB?.name,
          phone: userInDB?.phone,
          validated: userInDB?.validated,
          type: userInDB?.type,
        },
      };
      console.log("-- session callback: ", { session, user, newSession });

      return newSession;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "sms",
      name: "sms",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "+123456789",
        },
        code: { label: "Verification Code", type: "text" },
      },

      authorize: async (credentials) => {
        // Here you should verify the phone number and the code
        // For example, check against a database where you stored the code
        if (!credentials) throw new Error("验证信息为空");

        const { phone, code } = credentials;
        const user = await validateSms({ phone, code });
        if (!user) throw new Error("Phone number or code is incorrect");

        console.log("-- login success: ", user);
        return user;
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
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
