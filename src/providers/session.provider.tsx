"use client"

import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

export default function SafeSessionProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider
      refetchOnWindowFocus={
        // todo: why next-auth refetchOnWindowFocus in SessionProvider would trigger the internet request once but the callbacks twice, is one of them for initialization?
        false
      }
    >
      {children}
    </SessionProvider>
  )
}
