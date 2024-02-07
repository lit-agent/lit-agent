"use client"

import { MyUser } from "@/ds/user"
import { useAppData } from "@/hooks/use-app-data"
import { useEffect, useState } from "react"
import { getChatId } from "@/lib/socket"
import ChatDetailPage from "@/components/chat-detail"
import { IChatView } from "@/ds/message"
import { UserType } from "@prisma/client"
import { IUserView } from "@/ds/user.base"
import ChatList from "@/components/chat-list"
import ChatUserNoTargetPage from "@/components/chat.user-no-target.page"

export default function ChatListPage({
  user,
  users,
}: {
  user: MyUser
  users: IUserView[]
}) {
  const { targetUserId, messages } = useAppData()

  const [chats, setChats] = useState<IChatView[]>([])

  // todo: chats 按照对象 而非聊天记录
  // 对消息进行分组排序成会话列表
  useEffect(() => {
    const chats: IChatView[] = []
    const seenChannels = new Set<string>()
    messages.forEach((m) => {
      const isBroadcast = !m.room && !m.toUser
      if (isBroadcast) return

      const channelId =
        // group
        m.room?.id ??
        // chat
        getChatId(m.fromUser.id, m.toUser!.id)

      if (seenChannels.has(channelId)) return

      seenChannels.add(channelId)
      chats.push({
        roomId: m.room?.id,
        targetUser: m.room
          ? undefined
          : m.fromUser.id === user.id
            ? m.toUser!
            : m.fromUser,
        users: m.room?.users,
        message: m,
        unreadCount: 0,
      })
    })
    setChats(chats)
  }, [messages.length])

  console.log("[ChatHomePage]: ", { newMessages: messages, chats })

  if (user.type === UserType.blogger && !targetUserId)
    return <ChatList chats={chats} />

  if (!targetUserId) return <ChatUserNoTargetPage users={users} />

  return (
    <ChatDetailPage
      user={user}
      toUser={users.find((u) => u.id === targetUserId)!}
    />
  )
}
