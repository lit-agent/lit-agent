import { DefaultJWT } from "next-auth/jwt"
import { DefaultSession, DefaultUser } from "next-auth"
import { IUserMainView } from "@/schema/user"

export type SessionErrorType = "NoUserInToken" | "NoUserInDB" | "NoPhone"

/**
 * todo: 关于是否需要在 jwt/session 里加入一些其他字段
 * 我个人的想法是不要，否则不方便与数据库里的 user 表同步
 * 比如当 user 表里的信息更新后，还要传到到 jwt/session
 * 不如 jwt/session 里直接存储 userId
 * 然后通过 swr 完成与数据库里的 user 同步
 *
 * 但是 validated 这个字段是需要的，方便在 middleware 中 redirect
 */
interface TokenPayload {
  // 标识 token/session/user 是否有效
  valid?: boolean
  // 标识用户是否处于答题通过状态
  validated?: boolean
}

// ref: https://next-auth.js.org/getting-started/typescript#submodules
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT, TokenPayload {}
}
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & TokenPayload & { id: string }
  }

  interface User extends DefaultUser, TokenPayload {}
}
