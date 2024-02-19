import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import type { CreateWSSContextFnOptions } from "@trpc/server/adapters/ws"
import { getSession } from "next-auth/react"
import { prisma } from "@/lib/db"

import { getServerAuthSession } from "@/lib/auth/utils" /**
 /**
 * todo: unify 2 createContext
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  console.log("[trpc] createTRPCContext")
  const session = await getServerAuthSession()

  return {
    session,
    prisma,
    // ...opts,
  }
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (
  opts: CreateNextContextOptions | CreateWSSContextFnOptions,
) => {
  console.log("[trpc] createContext")
  const session = await getSession(opts)

  console.log(
    "[TrpcContext] createContext for",
    session?.user?.name ?? "unknown user",
  )

  return {
    session,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
