"use client"

import { useEffect } from "react"
import { useAppData } from "@/lib/store/use-app-data"
import { useSession } from "next-auth/react"
import { pusherClient } from "@/lib/socket/config"
import { getBroadcastId } from "@/lib/socket/helpers"
import { SocketEventType } from "@/lib/socket/events"
import { IMessageView } from "@/schema/message.base"

export default function SocketThread({
  serverMessages,
}: {
  serverMessages: IMessageView[]
}) {
  const { targetUserId, setMessages } = useAppData()
  const user = useSession().data?.user

  useEffect(() => {
    setMessages(serverMessages)
  }, [serverMessages])

  useEffect(() => {
    if (!user) return

    const channels: string[] = []

    // if (!user?.rooms?.length) signOut()

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

  return null
}
