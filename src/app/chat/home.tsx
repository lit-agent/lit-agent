"use client"

import { MyUser } from "@/ds/user"
import { api } from "@/trpc/react"
import { MessageContainer } from "@/components/message-item"
import { Input } from "@/components/ui/input"
import { useAppData } from "@/hooks/use-app-data"
import PrivateChatPage from "@/app/chat/private"
import { UserType } from "@prisma/client"
import { last } from "lodash"

export default function HomeChatPage({ user }: { user: MyUser }) {
  const { targetUserId, setTargetUserId } = useAppData()
  const { data: targetUser } = api.user.get.useQuery(
    { id: targetUserId! },
    { enabled: !!targetUserId },
  )

  console.log("-- HomeChatPage: ", { user, targetUserId, targetUser })

  if (user.type === UserType.blogger && !targetUserId) {
    return (
      <div className={"h-full overflow-hidden"}>
        <div className={"p-4"}>
          <Input type={"search"} className={"bg-gray-700"} />
        </div>

        {user.rooms.map((room) => {
          const targetUser = room.users.find((u) => u.id !== user.id)!
          return (
            <div
              key={room.id}
              onClick={() => {
                setTargetUserId(targetUser.id)
              }}
            >
              <MessageContainer user={targetUser} className={"p-4 border-b"}>
                {last(room.messages)
                  ? JSON.stringify(last(room.messages)!.body)
                  : "暂无消息！"}
              </MessageContainer>
            </div>
          )
        })}
      </div>
    )
  }

  if (!targetUser) return "loading..."

  return <PrivateChatPage user={user} targetUser={targetUser} />
}
