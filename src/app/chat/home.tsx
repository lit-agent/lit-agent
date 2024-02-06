"use client"

import { MyUser } from "@/ds/user"
import { api } from "@/trpc/react"
import { MessageContainer } from "@/components/message-item"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/hooks/use-app-data"
import PrivateChatPage from "@/app/chat/private"
import { Prisma, UserType } from "@prisma/client"
import { last, sortBy } from "lodash"
import { useEffect, useState } from "react"
import MessageGetPayload = Prisma.MessageGetPayload
import { Label } from "@/components/ui/label"
import { v4 } from "uuid"
import { IClientMessage } from "@/ds/message"
import _ from "lodash"
import { getBroadcastId, getChatId } from "@/lib/socket"
import { IUserView } from "@/ds/user.base"
import { Select } from "@/components/ui/select"
import { UserAvatar } from "@/components/avatar"
import { AwardFillIcon } from "@/lib/assets"

type IChat = {
  message: IClientMessage
  unreadCount: number

  roomId?: string
  users?: IUserView[] // 群

  targetUser?: IUserView // 个人
}

export default function HomeChatPage({ user }: { user: MyUser }) {
  const { targetUserId, setTargetUserId, newMessages, setNewMessages } =
    useAppData()
  const { data: users = [] } = api.user.list.useQuery()

  // 倒序
  const { data: serverMessages } = api.message.list.useQuery({})

  const [chats, setChats] = useState<IChat[]>([])

  // 初始化服务端消息
  useEffect(() => {
    if (!serverMessages?.length) return
    setNewMessages(serverMessages)
  }, [serverMessages])

  // todo: chats 按照对象 而非聊天记录
  // 对消息进行分组排序成会话列表
  useEffect(() => {
    const chats: IChat[] = []
    const seenChannels = new Set<string>()
    newMessages.forEach((m) => {
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
  }, [newMessages.length])

  console.log("[ChatHomePage]: ", { newMessages, chats })

  if (user.type === UserType.blogger && !targetUserId) {
    return (
      <div className={"h-full overflow-hidden flex flex-col"}>
        <div className={"p-4 flex justify-center"}>
          {/*<Input type={"search"} />*/}
          <Label>不孤岛</Label>
        </div>

        <div className={"grow overflow-auto"}>
          {chats.map((chat, index) => {
            //   todo: 改成固定的对方信息，不要随着信息变
            const targetUser = chat.targetUser!
            return (
              <div
                key={index}
                onClick={() => {
                  setTargetUserId(targetUser.id)

                  // setNewMessages((um) =>
                  //   um.filter(
                  //     (m) =>
                  //       m.room?.id !== chat.roomId &&
                  //       m.toUser?.id !== chat.toUser?.id &&
                  //       m.fromUser.id !== user.id,
                  //   ),
                  // )
                }}
                className={"relative"}
              >
                <MessageContainer
                  user={targetUser}
                  className={"p-4 border-b relative"}
                >
                  <div className={"line-clamp-2"}>
                    {JSON.stringify(chat.message.body)}
                  </div>
                </MessageContainer>

                {!!chat.unreadCount && (
                  <div
                    className={
                      "absolute right-4 top-0 bottom-0 my-auto z-50 w-6 h-6 flex items-center justify-center rounded-full shrink-0 bg-red-800 text-white"
                    }
                  >
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!targetUserId)
    return (
      <div className={"h-full flex flex-col gap-4 justify-center items-center"}>
        <div>total users: {users.length}</div>
        <div>
          total bloggers:{" "}
          {users.filter((user) => user.type === UserType.blogger).length}
        </div>

        {users
          .filter((user) => user.type === UserType.blogger)
          .map((user) => (
            <div
              key={user.id}
              className={"flex items-center gap-2"}
              onClick={() => {
                setTargetUserId(user.id)
              }}
            >
              <UserAvatar user={user} />
              <span>{user.name}</span>
              <span>{user.type === UserType.blogger && <AwardFillIcon />}</span>
            </div>
          ))}
      </div>
    )

  return (
    <PrivateChatPage
      user={user}
      toUser={users.find((u) => u.id === targetUserId)!}
    />
  )
}
