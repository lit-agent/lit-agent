"use server"

import { prisma } from "@/server/db"
import TaskList from "@/components/task-list"
import { ensureServerUser, getServerUser } from "@/server/auth"

import { taskViewSelector } from "@/ds/task"
import { roomViewSelector } from "@/ds/room"

export default async function ServerTaskPage() {
  const user = await ensureServerUser()
  const fires = await prisma.taskFrom.findMany({ ...taskViewSelector })
  console.log("[TaskPage]: ", { fires })

  return <TaskList user={user} fires={fires} />
}
