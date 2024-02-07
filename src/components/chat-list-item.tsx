import { MessageContainer } from "@/components/message-item"
import { useAppData } from "@/hooks/use-app-data"
import { IChatView } from "@/ds/message"

export default function ChatListItem({ chat }: { chat: IChatView }) {
  const { setTargetUserId } = useAppData()
  // todo: 支持群聊
  const targetUser = chat.targetUser!

  return (
    <div
      onClick={() => {
        setTargetUserId(targetUser.id)

        // setNewMessages((um) =>
        //   um.filter(
        //     (m) =>
        //       m.room?.id !== chat.roomId &&
        //       m.toUser?.id !== chat.toUser?.id &&
        //       m.fromUser.id !== user.id,
        //   ),
        // )
      }}
      className={"relative"}
    >
      <MessageContainer user={targetUser} className={"p-4 border-b relative"}>
        <div className={"line-clamp-2"}>
          {JSON.stringify(chat.message.body)}
        </div>
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
    </div>
  )
}
