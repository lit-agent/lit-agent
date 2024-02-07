"use server"

import { prisma } from "@/server/db"
import RoomPage from "@/components/room-page"
import { ensureServerUser, getServerUser } from "@/server/auth"

import { taskViewSelector } from "@/ds/task"
import { roomViewSelector } from "@/ds/room"

export default async function ServerTaskPage() {
  const rooms = await prisma.room.findMany({ ...roomViewSelector })
  const user = await ensureServerUser()

  return <RoomPage user={user} rooms={rooms} />
}
