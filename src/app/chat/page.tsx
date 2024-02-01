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
import { useRef } from "react";

export default function ChatPage() {
  const refInput = useRef<HTMLInputElement>(null);
  const { user } = useUser();
  console.log("-- user: ", user);

  const roomId = user ? `${user?.id}-jiugu` : undefined;
  const { data: messages = [] } = api.messaege.list.useQuery(
    { roomId },
    { enabled: !!user },
  );
  console.log(`-- messages: `, messages);

  const sendMessage = api.messaege.send.useMutation();

  return (
    <div className={"flex h-full flex-col"}>
      <SelectUser />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          messages.map((chatItem, index) => (
            <ChatItem {...chatItem} key={index} />
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
            if (!refInput.current || !roomId) return;

            const text = refInput.current.value;

            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              console.log("-- sending: ", refInput.current.value);
              sendMessage.mutate({ roomId, text });
              refInput.current.value = "";
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
