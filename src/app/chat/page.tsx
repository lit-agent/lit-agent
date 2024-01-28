"use client";

import JiuguImage from "../../../public/user-jiugu.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ArrowDownIcon from "@/../public/arrow-drop-down-line.svg";
import ChatItem from "@/app/_components/chat-item";
import { sampleChatItems } from "@/ds/mock";

export default function ChatPage() {
  return (
    <div className={"flex  flex-col gap-4 p-4"}>
      <div
        id={"header"}
        className={"flex  items-center justify-between gap-4 "}
      >
        <Avatar className={"h-5 w-5"}>
          <AvatarImage src={JiuguImage.src} />
        </Avatar>

        <div>玖姑</div>

        <ArrowDownIcon />
      </div>

      {sampleChatItems.map((chatItem, index) => (
        <ChatItem {...chatItem} key={index} />
      ))}
    </div>
  );
}
