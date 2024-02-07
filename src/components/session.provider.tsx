"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"
import { PropsWithChildren } from "react"
import { IMainUser } from "@/schema/user"

export default function MySessionProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <SafeSession>{children}</SafeSession>
    </SessionProvider>
  )
}

export const SafeSession = ({
  children,
  user,
}: PropsWithChildren & { user?: IMainUser }) => {
  const session = useSession()

  const sessionUser = session.data?.user

  console.log("[SafeSession]: ", { sessionUser, user })

  if (sessionUser) {
    if (!user) {
      console.log("[SafeSession] sign out user")
      signOut()
    }
  }

  return <>{children}</>
}
