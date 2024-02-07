import { prisma } from "@/server/db"
import { ensureServerUser } from "@/server/auth"
import FireDetailPage from "@/components/fire-detail"

import { fireViewSelector } from "@/ds/task"

export default async function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await ensureServerUser()

  const task = await prisma.taskFrom.findUnique({
    where: { id },
    ...fireViewSelector,
  })

  if (!user || !task) return

  return <TaskDetailPage user={user} task={task} />
}
