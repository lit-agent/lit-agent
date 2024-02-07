import { ensureServerUser } from "@/lib/auth"
import TaskDetailPage from "@/components/task-detail"

export default async function TaskDetailServerPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await ensureServerUser()

  return <TaskDetailPage user={user} taskId={id} />
}
