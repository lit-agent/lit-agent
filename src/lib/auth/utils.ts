import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/config"

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => {
  console.log("[NextAuth] getServerAuthSession...")
  return getServerSession(authOptions)
}