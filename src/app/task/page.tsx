"use server"

import { prisma } from "@/server/db"
import TaskPage from "@/components/task-page"
import { ensureServerUser, getServerUser } from "@/server/auth"

import { taskViewSelector } from "@/ds/task"

export default async function ServerTaskPage() {
  const tasks = await prisma.taskFrom.findMany({ ...taskViewSelector })
  const user = await ensureServerUser()

  return <TaskPage user={user} tasks={tasks} />
}
