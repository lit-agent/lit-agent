"use client"

import { useEffect } from "react"
import { useAppData } from "@/lib/store/use-app-data"
import { getBroadcastId } from "@/lib/socket/helpers"
import { SocketEventType } from "@/lib/socket/events"
import { IMessageView } from "@/schema/message.base"
import { useUser } from "@/hooks/use-user"
import { api } from "@/lib/trpc/react"
import { UserType } from "@prisma/client"
import { initPusherClient } from "@/lib/socket/config"

export const useGlobalMessages = () => {
  useInitMessages()
  useBindChannels()
}

const useInitMessages = () => {
  const { setMessages } = useAppData()
  const { user } = useUser()

  const { data: serverMessages = [] } = api.message.list.useQuery(
    {},
    { enabled: !!user },
  )

  useEffect(() => {
    if (serverMessages.length) setMessages(serverMessages)
  }, [serverMessages.length])
}

const useBindChannels = () => {
  const { setMessages } = useAppData()
  const { mainUser: user } = useUser()
  const { data: users = [] } = api.user.list.useQuery()

  useEffect(() => {
    if (!user) return

    const channels: string[] = []

    // 监听自己（所有发给自己的消息）
    channels.push(user.id)

    // 监听所有的room
    channels.push(...user.rooms.map((room) => room.id))

    // 监听广播（博主监听这个，从而能在列表页实时收到最新的）
    channels.push(
      ...users
        .filter((user) => user.type === UserType.blogger)
        .map((user) => getBroadcastId(user.id)),
    )

    console.log("[Socket] bound channels: ", channels)

    const pusherClient = initPusherClient()

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
  }, [
    user,
    // , JSON.stringify(users)
  ])
}
