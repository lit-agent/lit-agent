import { prisma } from "@/server/db"
import FireDetailPage from "@/components/fire-detail"
import { ensureServerUser } from "@/server/auth"
import { fireViewSelector } from "@/ds/task"

export default async function TaskDetailServerPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const fire = await prisma.taskFrom.findUniqueOrThrow({
    where: { id },
    ...fireViewSelector,
  })
  const user = await ensureServerUser()
  const userFire = await prisma.taskTo.findUnique({
    where: {
      taskId_userId: {
        userId: user.id,
        taskId: fire.id,
      },
    },
  })

  return <FireDetailPage user={user} fire={fire} userFire={userFire} />
}
