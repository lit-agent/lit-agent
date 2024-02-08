"use client"

import { useUser } from "@/hooks/use-user"
import { useAppData } from "@/lib/store/use-app-data"
import { useEffect, useRef } from "react"
import { api } from "@/lib/trpc/react"
import { getChatId } from "@/lib/socket/helpers"
import { MessageType } from "@/schema/message.base"
import { ChevronLeftIcon } from "lucide-react"
import { UserSelector } from "@/components/user-selector"
import { getClientMessageId } from "@/schema/message"
import Message from "@/components/message-item"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BloggerContainer } from "@/components/blogger"
import { IoMenuOutline } from "react-icons/io5"
import { UserType } from "@prisma/client"
import { useRouter } from "next/navigation"
import { UserAvatarWithName } from "@/components/user-avatar"

export default function ChatDetailPage({ params: { id } }: { params: { id } }) {
  const user = useUser()
  const { data: targetUser } = api.user.get.useQuery({ id })

  const refInput = useRef<HTMLInputElement>(null)
  const sendMessage = api.message.send.useMutation()
  const { messages, setMessages } = useAppData()
  const { data: toUser } = api.user.get.useQuery({ id }, { enabled: !!id })

  const submitMessage = () => {
    if (!refInput.current || !user || !toUser) return
    const text = refInput.current.value
    if (!text) return

    const channelId = getChatId(user.id, toUser.id)
    console.log("[Chat] sending message: ", { channelId, text })
    setMessages([
      {
        fromUser: user,
        toUser,
        room: null,
        task: null,
        body: { type: MessageType.Plain, title: text },
      },
      ...messages,
    ])

    sendMessage.mutate({
      toUserId: toUser.id,
      body: { type: MessageType.Plain, title: text },
    })

    refInput.current.value = ""
  }

  const refBottom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refBottom.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  const router = useRouter()

  return (
    <div className={"flex h-full flex-col overflow-hidden"}>
      <div className={"w-full justify-between items-center flex px-4 py-2"}>
        <div className={"w-8"}>
          {user?.type === UserType.blogger && (
            <ChevronLeftIcon
              onClick={() => {
                router.back()
              }}
            />
          )}
        </div>

        {/*<UserSelector />*/}
        {targetUser && <UserAvatarWithName user={targetUser} />}

        <div className={"w-8"} />
      </div>

      <div className={"flex grow flex-col-reverse gap-4 overflow-auto p-4"}>
        <div ref={refBottom} />

        {user &&
          messages
            .filter(
              (m) =>
                (!m.toUser && !m.room) || // broadcast
                getClientMessageId(m) === getChatId(user.id, id), // user chat
            )
            .map((message, index) => (
              <Message
                body={message.body}
                key={index}
                taskId={message.task?.id}
                user={message.fromUser}
              />
            ))}
      </div>

      <div className={"relative px-4 py-2"}>
        <Input
          ref={refInput}
          className={cn(
            "bg-[#463F4F] ",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0",
          )}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              submitMessage()
            }
          }}
        />

        <BloggerContainer
          className={
            "absolute bottom-0 right-5 top-0 my-auto h-6 w-6 text-gray-400"
          }
        >
          <IoMenuOutline />
        </BloggerContainer>
      </div>
    </div>
  )
}
