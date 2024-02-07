import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"

import { ADMIN_PHONE, USER_JIUGU_AI_ID } from "@/const"
import { fetchAdminUser, initUserAfterValidation } from "@/server/user"
import { getAdminBroadcastId } from "@/lib/socket"

const init = async () => {
  console.log("⏰ initializing database...")

  const adminUser = await fetchAdminUser()

  const roomId = await getAdminBroadcastId()
  await prisma.room.upsert({
    where: { id: roomId },
    create: { id: roomId },
    update: {},
  })

  const data = {
    type: UserType.assistant,
    name: "玖姑的AI助手",
  }
  await prisma.user.upsert({
    where: { id: USER_JIUGU_AI_ID },
    create: {
      id: USER_JIUGU_AI_ID,
      ...data,
    },
    update: data,
  })

  const users = await prisma.user.findMany()
  const result = await Promise.all(
    users.map(async (user) => {
      return await initUserAfterValidation(user.id)
    }),
  )
  console.log("[InitScript] init all user: ", result)

  console.log("[InitScript] ✅ initialized database.")

  // todo: update honors for all users
  // await prisma.user.update({
  //   where: { honors: {} },
  //   data: {
  //     honors: {
  //       connectOrCreate: {
  //         where: {
  //           id: "NewUser",
  //         },
  //         create: {
  //           id: "NewUser",
  //         },
  //       },
  //     },
  //   },
  // })
}

void init()
