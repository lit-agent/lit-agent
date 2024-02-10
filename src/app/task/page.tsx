"use server"

import { prisma } from "@/lib/db"
import TaskList from "@/components/task-list"
import { ensureServerUser, getServerUser } from "@/lib/auth"

import { taskListViewSchema } from "@/schema/task"
import { roomViewSelector } from "@/schema/room"

export default async function ServerTaskPage() {
  const user = await ensureServerUser()
  const tasks = await prisma.task.findMany({ ...taskListViewSchema })
  console.log("[TaskPage]: ", { fires: tasks })

  return <TaskList user={user} tasks={tasks} />
}
