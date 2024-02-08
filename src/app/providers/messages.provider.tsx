"use client"

import { useEffect } from "react"
import { useAppData } from "@/lib/store/use-app-data"
import { pusherClient } from "@/lib/socket/config"
import { getBroadcastId } from "@/lib/socket/helpers"
import { SocketEventType } from "@/lib/socket/events"
import { IMessageView } from "@/schema/message.base"
import { useAuthedUser } from "@/hooks/use-user"
import { api } from "@/lib/trpc/react"

export default function MessagesProvider({}: {}) {
  useInitMessages()
  useBindChannels()
  return null
}

const useInitMessages = () => {
  const { setMessages } = useAppData()
  const user = useAuthedUser()

  const { data: serverMessages = [] } = api.message.list.useQuery(
    {},
    { enabled: !!user },
  )

  useEffect(() => {
    if (serverMessages.length) setMessages(serverMessages)
  }, [serverMessages.length])
}

const useBindChannels = () => {
  const { targetUserId, setMessages } = useAppData()
  const user = useAuthedUser()

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
}
