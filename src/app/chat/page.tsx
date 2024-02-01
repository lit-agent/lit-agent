"use client";

import ChatItem from "@/components/chat-item";
import { BottomNavbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import { useUser } from "@/hooks/use-user";
import { SelectUser } from "@/components/select-user";
import { api } from "@/trpc/react";
import { useEffect, useRef, useState } from "react";
import { ClientMessage } from "@/ds/user";
import { pusherClient } from "@/lib/pusher";
import { DEFAULT_ROOM_ID } from "@/const";

export default function ChatPage() {
  const refInput = useRef<HTMLInputElement>(null);
  const { user, targetUser } = useUser();
  console.log("-- user: ", user);

  // todo: group-level room
  const roomId = DEFAULT_ROOM_ID; // targetUser. user ? `${user?.id}-jiugu` : undefined;
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const fetchMessages = api.messaege.fetch.useMutation();
  const sendMessage = api.messaege.send.useMutation();

  useEffect(() => {
    if (!roomId) return;
    fetchMessages
      .mutateAsync({ roomId })
      .then((messages) => setMessages(messages));

    pusherClient.subscribe(roomId);
    pusherClient.bind("user:sendMessage", (message: ClientMessage) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      pusherClient.unsubscribe(roomId);
      pusherClient.unbind("user:sendMessage");
    };
  }, [roomId]);

  const submitMessage = () => {
    if (!refInput.current) return;

    const text = refInput.current.value;
    if (!text) return;

    console.log("-- sending: ", { text });

    sendMessage.mutate({ roomId, text });

    // todo: 思考要不要做上屏优化
    // setMessages([
    //   ...messages,
    //   {
    //     user: {
    //       id: user!.id,
    //       name: user?.name ?? "",
    //       image: user?.image ?? "",
    //       type: "user",
    //     },
    //     text,
    //     updatedAt: new Date(),
    //   },
    // ]);
    refInput.current.value = "";
  };

  console.log(`-- messages: `, messages);

  useEffect(() => {}, [roomId]);

  return (
    <div className={"flex h-full flex-col"}>
      <SelectUser />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          messages.map((message, index) => (
            <ChatItem
              user={message.user!}
              segments={[{ type: "text", content: message.text }]}
              key={index}
            />
          ))
        }
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

      <BottomNavbar />
    </div>
  );
}
