import ChatPage from "@/app/chat/page";

export default function RoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <ChatPage params={{ channelId: params.id, withBack: true }} />;
}
