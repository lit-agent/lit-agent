"use server"

import { prisma } from "@/lib/db"
import TaskList from "@/components/task-list"
import { ensureServerUser, getServerUser } from "@/lib/auth"

import { taskViewSelector } from "@/schema/task"
import { roomViewSelector } from "@/schema/room"

export default async function ServerTaskPage() {
  const user = await ensureServerUser()
  const fires = await prisma.task.findMany({ ...taskViewSelector })
  console.log("[TaskPage]: ", { fires })

  return <TaskList user={user} tasks={fires} />
}
