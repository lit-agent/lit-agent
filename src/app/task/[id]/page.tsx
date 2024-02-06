import { prisma } from "@/server/db"
import { getServerAuthSession } from "@/server/auth"
import TaskDetailPageInner from "@/app/task/[id]/page_"

export default async function TaskDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const session = await getServerAuthSession()
  const task = await prisma.taskFrom.findUnique({
    where: { id },
    include: {
      room: {
        include: {
          messages: true,
        },
      },
      fromUser: true,
      toUsers: true,
    },
  })

  console.log("-- task detail page: ", { session, id, task })
  if (!session || !task) return

  return <TaskDetailPageInner session={session} task={task} />
}
