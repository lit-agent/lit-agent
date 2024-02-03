import ChatPage from "@/app/chat/page";

export default function RoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <ChatPage params={{ roomId: params.id, withBack: true }} />;
}
