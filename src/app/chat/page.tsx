"use client";

import ChatItem from "@/components/chat-item";
import { BottomNavbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import { useUser } from "@/hooks/use-user";
import { SelectUser } from "@/components/select-user";

export default function ChatPage() {
  const { user } = useUser();

  return (
    <div className={"flex h-full flex-col"}>
      <SelectUser />

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {
          // sampleChatItems
          [].map((chatItem, index) => (
            <ChatItem {...chatItem} key={index} />
          ))
        }
      </div>

      <div className={"relative px-4 py-1"}>
        <Input
          className={cn(
            "bg-[#463F4F] ",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0",
          )}
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
