import { prisma } from "@/server/db"
import { getServerAuthSession } from "@/server/auth"
import TaskDetail2 from "@/components/task-detail-2"
import { taskViewSelector } from "@/ds/requirement"

export default async function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const session = await getServerAuthSession()
  const task = await prisma.taskFrom.findUnique({
    where: { id },
    ...taskViewSelector,
  })

  // console.log("-- task detail page: ", { session, id, task })
  if (!session || !task) return

  return <TaskDetail2 user={session.user} task={task} />
}
