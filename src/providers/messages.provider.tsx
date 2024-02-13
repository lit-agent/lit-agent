"use client"
import { useGlobalMessages } from "@/hooks/use-messages"
import { PropsWithChildren } from "react"

export default function MessagesProvider({ children }: PropsWithChildren) {
  useGlobalMessages()

  return <>{children}</>
}
