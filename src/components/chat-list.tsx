import { Label } from "@/components/ui/label"
import ChatListItem from "@/components/chat-list-item"
import { IChatView } from "@/schema/message"
import { UserAvatar } from "@/components/user-avatar"
import { useUser } from "@/hooks/use-user"
import { Input } from "./ui/input"

export default function ChatList({ chats }: { chats: IChatView[] }) {
  const user = useUser()
  if (!user) return "loading user"

  return (
    <div
      className={"h-full overflow-hidden flex flex-col p-4 gap-4 bg-[#212121]"}
    >
      <div className={"flex items-center gap-2"}>
        <UserAvatar user={user} />
        <Label className={"text-2xl font-medium tracking-wider"}>
          {user.name}
        </Label>
      </div>

      <Input
        type={"search"}
        className={"bg-[#181818] placeholder:text-center"}
        placeholder={"🔍 搜索"}
      />

      <div className={"grow overflow-auto"}>
        {chats.map((chat, index) => (
          <ChatListItem chat={chat} key={index} />
        ))}
      </div>
    </div>
  )
}
