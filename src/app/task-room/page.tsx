import { prisma } from "@/server/db"
import { TaskRoomPage } from "@/components/task-room"
import { taskViewSelector } from "@/ds/task"

export default async function TaskRoomServerPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const task = await prisma.taskFrom.findUniqueOrThrow({
    where: { id },
    ...taskViewSelector,
  })

  return <TaskRoomPage task={task} />
}
