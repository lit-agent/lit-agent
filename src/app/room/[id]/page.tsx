import ChatPage from "@/components/chat-page";

export default function RoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <ChatPage roomId={params.id} withBack />;
}
