import { useUser } from "@/hooks/use-user"
import { useAppData } from "@/hooks/use-app-data"
import { useEffect } from "react"
import { getBroadcastId, pusherClient, SocketEventType } from "@/lib/socket"
import { IClientMessage } from "@/ds/message"

export const useSocket = () => {
  const user = useUser()
  const { targetUserId, setNewMessages } = useAppData()

  useEffect(() => {
    if (!user) return

    const channels: string[] = []

    // 监听自己（所有发给自己的消息）
    channels.push(user.id)

    // 监听所有的room
    channels.push(...user.rooms.map((room) => room.id))

    // 监听广播（博主监听这个，从而能在列表页实时收到最新的）
    if (targetUserId) channels.push(getBroadcastId(targetUserId))

    console.log("-- bound channels: ", channels)

    channels.forEach((channelId) => pusherClient.subscribe(channelId))

    pusherClient.bind(SocketEventType.Message, (message: IClientMessage) => {
      console.log("-- received message: ", message)
      // 倒序
      setNewMessages((messages) => [message, ...messages])
    })

    return () => {
      channels.forEach((channelId) => pusherClient.unsubscribe(channelId))
      pusherClient.unbind(SocketEventType.Message)
    }
  }, [targetUserId, user])
}
