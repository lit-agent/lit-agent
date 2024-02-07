import TaskDetailPage from "@/components/task-detail"
import { ensureServerUser } from "@/server/auth"

export default async function TaskDetailServerPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await ensureServerUser()

  return <TaskDetailPage user={user} taskId={id} />
}
