"use client";

import JiuguImage from "../../../public/user-jiugu.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatItem from "@/components/chat-item";
import { BottomNavbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { IoMenuOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { BloggerContainer } from "@/containers/blogger";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";
import { api } from "@/trpc/react";

export default function ChatPage() {
  const { user } = useUser();
  const { data: users = [] } = api.user.list.useQuery();

  return (
    <div className={"flex h-full flex-col"}>
      <Select>
        <SelectTrigger
          id={"header"}
          className={"flex items-center justify-center gap-1 p-2"}
        >
          <Avatar className={"h-5 w-5"}>
            <AvatarImage src={JiuguImage.src} />
          </Avatar>

          <div>玖姑</div>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {users.map((item, index) => (
              <SelectItem value={`${index}`} key={index}>
                <div className={"flex items-center gap-2"}>
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      item.status === "online" && "bg-green-500",
                      item.status === "offline" && "bg-gray-500",
                      item.status === "busy" && "bg-yellow-500",
                    )}
                  />
                  <div>
                    {item.id}({item.phone})
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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
