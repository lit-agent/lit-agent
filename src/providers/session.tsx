"use client"

import { getSession, SessionProvider, useSession } from "next-auth/react"
import { PropsWithChildren } from "react"

export default function MySessionProvider({ children }: PropsWithChildren) {
  const session = useSession()
  const routePath = location.pathname
  console.log("[SessionProvider]: ", { session, routePath })

  return <SessionProvider>{children}</SessionProvider>
}
