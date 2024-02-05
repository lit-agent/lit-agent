"use client"

import { useEffect, useRef, useState } from "react"
import { ClientMessage, MyUser } from "@/ds/user"
import { api } from "@/trpc/react"
import { pusherClient } from "@/lib/pusher"
import { SelectUser } from "@/components/select-user"
import { MessageBody, MessageContainer } from "@/components/message-item"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BloggerContainer } from "@/containers/blogger"
import { IoMenuOutline } from "react-icons/io5"
import { MessageType } from "@/ds/message.base"
import { SocketEventType } from "@/ds/socket"

export default function ChatPage({
  user,
  channelId,
  withBack,
}: {
  user: MyUser
  channelId: string
  withBack?: boolean
}) {
  const refInput = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState<ClientMessage[]>([])
  const fetchMessages = api.message.fetch.useMutation()
  const sendMessage = api.message.send.useMutation()

  useEffect(() => {
    if (!channelId) return

    fetchMessages
      .mutateAsync({ channelId: channelId })
      .then((messages) => setMessages(messages))

    pusherClient.subscribe(channelId)

    pusherClient.bind(SocketEventType.Message, (message: ClientMessage) => {
      setMessages((messages) => [...messages, message])
    })

    return () => {
      pusherClient.unsubscribe(channelId)
      pusherClient.unbind(SocketEventType.Message)
    }
  }, [channelId])

  const submitMessage = () => {
    if (!refInput.current || !user) return

    const text = refInput.current.value
    if (!text) return

    console.log("-- sending: ", { text })

    // todo: 思考要不要做上屏优化
    sendMessage.mutate({
      channelId: `${user!.id}-jiugu`,
      body: { type: MessageType.Plain, title: text },
    })

    refInput.current.value = ""
  }

  useEffect(() => {}, [channelId])

  const refBottom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    refBottom.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  // console.log(`-- chat page: `, {channelId,/* messages */});

  return (
    <div className={"flex h-full flex-col overflow-hidden"}>
      <SelectUser withBack={withBack} />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {messages.map((message, index) => (
          <MessageItem
            message={message}
            key={index}
            channelId={channelId}
            taskId={message.task?.id}
            user={user}
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

const MessageItem = ({
  channelId,
  taskId,
  user,
  message,
}: {
  channelId: string
  taskId?: string
  user: MyUser
  message: ClientMessage
}) => {
  return (
    <MessageContainer user={message.fromUser}>
      {/*<MessageMain channelId={channelId} taskId={taskId} message={message} />*/}
      <MessageBody message={message} />
    </MessageContainer>
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
