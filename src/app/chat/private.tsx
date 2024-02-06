"use client"

import { useEffect, useRef, useState } from "react"
import { BaseClientUser, MyUser } from "@/ds/user"
import { api } from "@/trpc/react"
import { SelectUser } from "@/components/select-user"
import Message from "@/components/message-item"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BloggerContainer } from "@/containers/blogger"
import { IoMenuOutline } from "react-icons/io5"
import { MessageType } from "@/ds/message.base"
import { useAppData } from "@/hooks/use-app-data"
import { UserType } from "@prisma/client"
import { ChevronLeftIcon } from "lucide-react"
import { last } from "lodash"
import { ClientMessage } from "@/ds/message"
import { getChatRoomId } from "@/lib/socket"

export default function PrivateChatPage({
  user,
  targetUser,
  withBack,
}: {
  user: MyUser
  targetUser: BaseClientUser
  withBack?: boolean
}) {
  const refInput = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const fetchMessages = api.message.fetch.useMutation()
  const sendMessage = api.message.send.useMutation()
  const { setTargetUserId, unreadMessages, setUnreadMessages } = useAppData()

  const roomId = getChatRoomId(user.id, targetUser.id)

  useEffect(() => {
    fetchMessages
      .mutateAsync({ roomId })
      .then((messages) => setMessages(messages))
  }, [])

  const channelId = getChatRoomId(user.id, targetUser.id)

  useEffect(() => {
    const newMessage = last(unreadMessages)
    if (newMessage?.roomId === channelId) {
      setMessages((messages) => [...messages, newMessage])
      setUnreadMessages(unreadMessages.slice(0, unreadMessages.length - 1))
    }
  }, [unreadMessages.length])

  const submitMessage = () => {
    if (!refInput.current || !user) return

    const text = refInput.current.value
    if (!text) return

    const channelId = getChatRoomId(user.id, targetUser.id)
    console.log("-- sending: ", { channelId, text })

    // todo: 思考要不要做上屏优化
    sendMessage.mutate({
      roomId,
      body: { type: MessageType.Plain, title: text },
    })

    refInput.current.value = ""
  }

  const refBottom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refBottom.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  // console.log(`-- chat page: `, {channelId,/* messages */});

  return (
    <div className={"flex h-full flex-col overflow-hidden"}>
      <div className={"w-full justify-between items-center flex px-4 py-2"}>
        <div className={"w-8"}>
          {user.type === UserType.blogger && (
            <ChevronLeftIcon
              onClick={() => {
                setTargetUserId(null)
              }}
            />
          )}
        </div>

        <SelectUser user={user} />

        {/*<UserComp user={targetUser} />*/}

        <div className={"w-8"} />
      </div>

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {messages.map((message, index) => (
          <Message
            body={message.body}
            key={index}
            taskId={message.room?.task?.id}
            user={message.fromUser}
          />
        ))}
        <div ref={refBottom} />
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

//
// const MessageMain = ({
//   channelId,
//   taskId,
//   message,
// }: {
//   channelId: string;
//   taskId?: string;
//   message: ClientMessage;
// }) => {
//   const [chosen, setChosen] = useState<string | undefined>(undefined);
//   const execAction = api.message.execAction.useMutation();
//   if (!message.task) return;
//
//   return (
//     <div>
//       <div>{message.task.title}</div>
//
//       {message.task.body.type === TaskType.broadcast && (
//         <div>{message.task.content}</div>
//       )}
//
//       {message.task.type === TaskType.textChoices && (
//         <>
//           <RadioGroup
//             className={"gap-0"}
//             value={chosen}
//             onValueChange={setChosen}
//           >
//             {message.task.choices.map((choice, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-2 hover:bg-gray-900 px-2 rounded-lg"
//               >
//                 <RadioGroupItem
//                   value={choice.id}
//                   id={choice.id}
//                   className={"shrink-0"}
//                 />
//                 <Label
//                   htmlFor={choice.id}
//                   className={cn(
//                     "grow p-2 rounded",
//                     chosen !== choice.id && "text-white/50",
//                   )}
//                 >
//                   {choice.content}
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
//
//           <Button
//             className={"w-full"}
//             size={"sm"}
//             onClick={(event) => {
//               console.log("-- clicked message: ", message);
//
//               if (!chosen) {
//                 void toast.error("请先选择");
//                 event.preventDefault();
//                 return;
//               }
//
//               execAction.mutate({
//                 channelId,
//                 taskId: taskId!,
//                 body: [
//                   {
//                     type: MessageType.Plain,
//                     content: `我选了：${message.task?.choices.find((choice) => choice.id === chosen)!.content}`,
//                   },
//                 ],
//               });
//             }}
//           >
//             提交
//           </Button>
//         </>
//       )}
//     </div>
//   );
// };
