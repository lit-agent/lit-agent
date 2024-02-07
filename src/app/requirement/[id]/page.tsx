import { prisma } from "@/server/db"
import { ensureServerUser } from "@/server/auth"
import TaskDetail2 from "@/components/task-detail-2"

import { taskViewSelector } from "@/ds/task"

export default async function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await ensureServerUser()

  const task = await prisma.taskFrom.findUnique({
    where: { id },
    ...taskViewSelector,
  })

  if (!user || !task) return

  return <TaskDetail2 user={user} task={task} />
}
