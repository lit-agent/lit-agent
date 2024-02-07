"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"
import { PropsWithChildren } from "react"
import { IMainUser } from "@/schema/user"

export default function MySessionProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>
}
