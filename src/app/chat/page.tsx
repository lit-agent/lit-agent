"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@/hooks/use-user";
import { ClientMessage } from "@/ds/user";
import { api } from "@/trpc/react";
import { pusherClient } from "@/lib/pusher";
import { SelectUser } from "@/components/select-user";
import ChatItemDetail, { ChatItemContainer } from "@/components/chat-item";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import { IoMenuOutline } from "react-icons/io5";
import { SocketEventType } from "@/ds/event";
import { MessageType } from "@prisma/client";

export default function ChatPage({
  params: { roomId, withBack },
}: {
  params: {
    roomId: string;
    withBack?: boolean;
  };
}) {
  const refInput = useRef<HTMLInputElement>(null);
  const { user, targetUser } = useUser();
  console.log("-- chat: ", { userId: user.id, roomId });

  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const fetchMessages = api.message.fetch.useMutation();
  const sendMessage = api.message.send.useMutation();

  useEffect(() => {
    if (!roomId) return;

    fetchMessages
      .mutateAsync({ fromUserId: roomId })
      .then((messages) => setMessages(messages));

    pusherClient.subscribe(roomId);
    pusherClient.bind(SocketEventType.NewTask, (message: ClientMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
      pusherClient.unbind(SocketEventType.NewTask);
    };
  }, [roomId]);

  const submitMessage = () => {
    if (!refInput.current || !user) return;

    const text = refInput.current.value;
    if (!text) return;

    console.log("-- sending: ", { text });

    // todo: 思考要不要做上屏优化
    sendMessage.mutate({
      toUsers: {
        connect: {
          id: roomId,
        },
      },
      fromUser: {
        connect: {
          id: user.id,
        },
      },
      text,
      type: MessageType.Plain,
    });

    refInput.current.value = "";
  };

  console.log(`-- messages: `, messages);

  useEffect(() => {}, [roomId]);

  return (
    <div className={"flex h-full flex-col overflow-hidden"}>
      <SelectUser withBack={withBack} />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {messages.map((message, index) => (
          <RenderChatItem message={message} key={index} />
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
              submitMessage();
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
  );
}

const RenderChatItem = ({ message }: { message: ClientMessage }) => {
  switch (message.type) {
    case "NewTask":
      return (
        <ChatItemContainer user={message.fromUser}>
          <div>
            <div>{message.task.title}(todo: new-task)</div>
            <div>{message.task.content}</div>
          </div>
        </ChatItemContainer>
      );

    case "Plain":
    default:
      return (
        <ChatItemDetail
          user={message.fromUser}
          segments={[{ type: "text", content: message.text }]}
        />
      );
  }
};
