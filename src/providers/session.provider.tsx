"use client"

import { SessionProvider, signOut, useSession } from "next-auth/react"
import { PropsWithChildren, useEffect } from "react"

export default function SafeSessionProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <StableSessionProviderInner>{children}</StableSessionProviderInner>
    </SessionProvider>
  )
}

function StableSessionProviderInner({ children }: PropsWithChildren) {
  const session = useSession()
  const error = session.data?.user.error

  useEffect(() => {
    if (error) {
      console.log("[SafeSession] signing out due to error: ", error)
      signOut()
    }
  }, [error])

  return children
}
