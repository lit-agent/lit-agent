import {
  getMessageAbstract,
  MessageContainer,
} from "@/components/chat/message-item"
import { useAppData } from "@/lib/store/use-app-data"
import { IChatView } from "@/schema/message"
import Link from "next/link"

export default function ChatListItem({ chat }: { chat: IChatView }) {
  if (!chat.targetUser) return "loading chat item"

  return (
    <Link href={`/chat/${chat.targetUser.id}`} className={"relative"}>
      <MessageContainer
        user={chat.targetUser}
        message={chat.message}
        className={"py-4 border-b relative"}
      >
        <div className={"truncate"}>{getMessageAbstract(chat.message)}</div>
      </MessageContainer>

      {!!chat.unreadCount && (
        <div
          className={
            "absolute right-4 top-0 bottom-0 my-auto z-50 w-6 h-6 flex items-center justify-center rounded-full shrink-0 bg-red-800 text-white"
          }
        >
          {chat.unreadCount}
        </div>
      )}
    </Link>
  )
}
