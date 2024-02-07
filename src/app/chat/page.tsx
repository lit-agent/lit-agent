import { ensureServerUser } from "@/lib/auth"
import ChatListPage from "@/components/chat.page"
import { prisma } from "@/lib/db"
import { userListViewSchema } from "@/schema/user.base"

export default async function ChatPage() {
  const user = await ensureServerUser()

  const users = await prisma.user.findMany({
    ...userListViewSchema,
  })

  return <ChatListPage user={user} users={users} />
}
