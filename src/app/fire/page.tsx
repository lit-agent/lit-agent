"use server"

import { prisma } from "@/server/db"
import FireList from "@/components/fire-list"
import { ensureServerUser, getServerUser } from "@/server/auth"

import { fireViewSelector } from "@/ds/task"
import { roomViewSelector } from "@/ds/room"

export default async function ServerTaskPage() {
  const user = await ensureServerUser()
  const fires = await prisma.taskFrom.findMany({ ...fireViewSelector })
  console.log("[TaskPage]: ", { fires })

  return <FireList user={user} fires={fires} />
}
