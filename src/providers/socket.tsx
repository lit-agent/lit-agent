"use client"

import { PropsWithChildren } from "react"
import { useSocket } from "@/hooks/use-socket"

export default function SocketProvider({ children }: PropsWithChildren) {
  useSocket()

  return <>{children}</>
}
