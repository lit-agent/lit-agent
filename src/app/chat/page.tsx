import { ensureServerUser } from "@/server/auth"
import ChatListPage from "@/components/chat.page"
import { prisma } from "@/server/db"
import { userViewSelector } from "@/ds/user.base"

export default async function ChatPage() {
  const user = await ensureServerUser()

  const users = await prisma.user.findMany({
    ...userViewSelector,
  })

  return <ChatListPage user={user} users={users} />
}
