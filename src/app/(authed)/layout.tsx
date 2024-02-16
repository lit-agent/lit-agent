"use client"

import { PropsWithChildren } from "react"
import MessagesProvider from "@/providers/messages.provider"

export default function AuthedLayout({ children }: PropsWithChildren) {
  return <MessagesProvider>{children}</MessagesProvider>
}
