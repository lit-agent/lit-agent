"use client";

import JiuguImage from "../../../public/user-jiugu.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ArrowDownIcon from "@/../public/arrow-drop-down-line.svg";
import ChatItem from "@/app/_components/chat-item";
import { sampleChatItems } from "@/ds/mock";
import { BottomNavbar } from "@/app/_components/navbar";
import { Input } from "@/components/ui/input";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  return (
    <div className={"flex h-full flex-col"}>
      <div
        id={"header"}
        className={"flex items-center justify-center gap-1 p-2"}
      >
        <Avatar className={"h-5 w-5"}>
          <AvatarImage src={JiuguImage.src} />
        </Avatar>

        <div>玖姑</div>

        <ArrowDownIcon />
      </div>

      <div className={"flex grow flex-col gap-4 overflow-auto p-4"}>
        {sampleChatItems.map((chatItem, index) => (
          <ChatItem {...chatItem} key={index} />
        ))}
      </div>

      <div className={"relative px-4 py-1"}>
        <Input
          className={cn(
            "bg-[#463F4F] ",
            "focus-visible:ring-0",
            "focus-visible:ring-offset-0",
          )}
        />
        <IoMenuOutline
          className={
            "absolute bottom-0 right-5 top-0 my-auto h-6 w-6 text-gray-400"
          }
        />
      </div>

      <BottomNavbar />
    </div>
  );
}
