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

type IListRoom = {
  id: string
  message: MessageGetPayload<{ include: { fromUser: true } }>
  unreadCount: number
}

export default function HomeChatPage({ user }: { user: MyUser }) {
  const { targetUserId, setTargetUserId, unreadMessages } = useAppData()
  const { data: targetUser } = api.user.get.useQuery(
    { id: targetUserId! },
    { enabled: !!targetUserId },
  )

  const [rooms, setRooms] = useState<IListRoom[]>(
    user.rooms
      .filter((r) => !!r.messages.length)
      .map((r) => ({
        id: r.id,
        message: last(r.messages)!,
        unreadCount: 0,
      })),
  )

  useEffect(() => {
    if (!unreadMessages.length) return

    const message = last(unreadMessages)!
    if (!rooms.some((r) => r.id === message.room!.id)) {
      setRooms([{ id: message.room!.id, message, unreadCount: 1 }, ...rooms])
      return
    }

    const newRooms = [...rooms]
    const room = newRooms.find((r) => r.id === message.room!.id)!
    room.unreadCount++
    room.message = message
    setRooms(sortBy(newRooms, (r) => -+r.message.createdAt))
  }, [unreadMessages.length])

  if (user.type === UserType.blogger && !targetUserId) {
    return (
      <div className={"h-full overflow-hidden"}>
        <div className={"p-4"}>
          <Input type={"search"} />
        </div>

        {unreadMessages.length && (
          <div className={"flex justify-center text-sm text-gray-500"}>
            您有 {unreadMessages.length} 条未读消息
          </div>
        )}

        {rooms.map((room) => {
          const targetUser = room.message.fromUser
          return (
            <div
              key={room.id}
              onClick={() => {
                setTargetUserId(targetUser.id)
              }}
              className={"relative bg-cyan-500"}
            >
              <MessageContainer
                user={targetUser}
                className={"p-4 border-b relative"}
              >
                {JSON.stringify(room.message.body)}
              </MessageContainer>

              {!!room.unreadCount && (
                <div
                  className={
                    "absolute right-4 top-0 bottom-0 my-auto z-50 w-6 h-6 flex items-center justify-center rounded-full shrink-0 bg-red-800 text-white"
                  }
                >
                  {room.unreadCount}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (!targetUser) return "loading..."

  return <PrivateChatPage user={user} targetUser={targetUser} />
}
