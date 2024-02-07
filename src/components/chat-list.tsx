import { Label } from "@/components/ui/label"
import ChatListItem from "@/components/chat-list-item"
import { IChatView } from "@/ds/message"

export default function ChatList({ chats }: { chats: IChatView[] }) {
  return (
    <div className={"h-full overflow-hidden flex flex-col"}>
      <div className={"p-4 flex justify-center"}>
        {/*<Input type={"search"} />*/}
        <Label>不孤岛</Label>
      </div>

      <div className={"grow overflow-auto"}>
        {chats.map((chat, index) => (
          <ChatListItem chat={chat} key={index} />
        ))}
      </div>
    </div>
  )
}
