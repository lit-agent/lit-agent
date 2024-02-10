"use client"

import { useAppData } from "@/lib/store/use-app-data"
import { useEffect, useState } from "react"
import { IChatView } from "@/schema/message"
import { getChatId } from "@/lib/socket/helpers"
import { useUser } from "@/hooks/use-user"
import { Label } from "@/components/ui/label"
import ChatListItem from "@/components/chat/chat-list-item"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { UserAvatar } from "@/components/user/user-avatar"

export default function ChatListPage() {
  const user = useUser()

  const { messages } = useAppData()

  const [chats, setChats] = useState<IChatView[]>([])

  // todo: chats 按照对象 而非聊天记录
  // 对消息进行分组排序成会话列表
  useEffect(() => {
    if (!user) return

    const chats: IChatView[] = []
    const seenChannels = new Set<string>()

    messages.forEach((m) => {
      // todo: 不稳定，比如用户被删除后，因为现在写了置空策略
      const isBroadcast = !m.room && !m.toUser
      if (isBroadcast) return

      // todo: 不支持群聊，要保证 targetUserId
      if (m.room) return

      const channelId = getChatId(m.fromUser.id, m.toUser!.id)

      // todo: !!!!!!!!!!drop duplicates
      if (seenChannels.has(channelId)) return

      seenChannels.add(channelId)

      console.log("[Chat] pushing chat with channelId=", channelId)
      chats.push({
        targetUser: m.fromUser.id === user.id ? m.toUser! : m.fromUser,
        message: m,
        unreadCount: 0,
      })
    })

    setChats(chats)
  }, [messages.length])

  console.log("[ChatHomePage]: ", { messages, chats })

  return (
    <div
      className={"h-full overflow-hidden flex flex-col p-4 gap-4 bg-[#212121]"}
    >
      <Input
        type={"search"}
        className={"bg-[#181818] placeholder:text-center"}
        placeholder={"🔍 搜索"}
      />

      <div className={"grow overflow-auto"}>
        {chats.map((chat, index) => (
          <ChatListItem chat={chat} key={index} />
        ))}
      </div>
    </div>
  )
}
