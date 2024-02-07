"use client"

import { PropsWithChildren, useEffect } from "react"
import { useAppData } from "@/hooks/use-app-data"
import { getBroadcastId, pusherClient, SocketEventType } from "@/lib/socket"
import { IMessageView } from "@/ds/message.base"
import { MyUser } from "@/ds/user"

export default function SocketProvider({
  children,
  serverMessages,
  user,
}: PropsWithChildren & {
  serverMessages: IMessageView[]
  user?: MyUser
}) {
  const { targetUserId, setMessages } = useAppData()

  useEffect(() => {
    setMessages(serverMessages)
  }, [serverMessages])

  useEffect(() => {
    if (!user) return

    const channels: string[] = []

    // 监听自己（所有发给自己的消息）
    channels.push(user.id)

    // 监听所有的room
    channels.push(...user.rooms.map((room) => room.id))

    // 监听广播（博主监听这个，从而能在列表页实时收到最新的）
    if (targetUserId) channels.push(getBroadcastId(targetUserId))

    console.log("[Socket] bound channels: ", channels)

    channels.forEach((channelId) => pusherClient.subscribe(channelId))

    pusherClient.bind(SocketEventType.Message, (message: IMessageView) => {
      console.log("[Socket] received message: ", message)
      // 倒序
      setMessages((messages) => [message, ...messages])
    })

    return () => {
      channels.forEach((channelId) => pusherClient.unsubscribe(channelId))
      pusherClient.unbind(SocketEventType.Message)
    }
  }, [targetUserId, user])

  return <>{children}</>
}
