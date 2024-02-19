"use client"

import { SessionProvider, signIn, signOut, useSession } from "next-auth/react"
import { PropsWithChildren } from "react"
import { LoaderIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SafeSessionProvider({ children }: PropsWithChildren) {
  return (
    <SessionProvider
      refetchOnWindowFocus={
        // todo: why next-auth refetchOnWindowFocus in SessionProvider would trigger the internet request once but the callbacks twice, is one of them for initialization?
        false
      }
    >
      <ValidSessionProvider>{children}</ValidSessionProvider>
    </SessionProvider>
  )
}

const ValidSessionProvider = ({ children }: PropsWithChildren) => {
  const session = useSession()

  if (session.data?.user.valid === false)
    return (
      <div
        className={
          "w-screen h-screen flex flex-col items-center justify-center gap-4"
        }
      >
        <Label>Your session has been expired, please re-login again!</Label>
        <Button onClick={() => signOut()}>退出登陆</Button>
      </div>
    )

  return children
}
