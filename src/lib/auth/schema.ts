import { DefaultJWT } from "next-auth/jwt"
import { DefaultSession, DefaultUser } from "next-auth"
import { IUserMainView } from "@/schema/user"

export type SessionErrorType = "NoUserInToken" | "NoUserInDB" | "NoPhone"

// ref: https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    validated?: boolean
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
    user: DefaultSession["user"] & IUserMainView
    error?: SessionErrorType
  }

  interface User extends DefaultUser {
    validated?: boolean
  }
}
