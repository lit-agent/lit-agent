"use client"

import { SessionProvider, useSession } from "next-auth/react"
import { PropsWithChildren, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LOG_AUTH_ENABLED } from "@/config"

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

const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const path = usePathname()

  const isLoggingIn = path.startsWith("/intro")
  const isValidating = path.startsWith("/validation")
  const session = useSession()

  if (LOG_AUTH_ENABLED)
    console.log(
      "[SessionProvider]: ",
      JSON.stringify({
        id: session.data?.user.id,
        error: session?.data?.error,
        path,
      }),
      "\n<<<\n\n",
    )

  useEffect(() => {
    // 非登录页，但session有问题，则重定向回登录页
    if (!isLoggingIn && (!session || session.data?.error))
      return router.push("/intro")

    // 非答题页，但处于待答题状态，则重定向回答题页
    if (!isValidating && session && !session.data?.user.validated)
      return router.push("/validation")

    // 在Auth页，但处于已验证状态，则重定向回首页
    if ((isLoggingIn || isValidating) && session.data?.user.validated)
      return router.push("/")
  }, [path])

  return null
}
