import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"

import { ADMIN_PHONE, USER_JIUGU_AI_ID } from "@/const"
import { initValidatedUser } from "@/server/user"

const init = async () => {
  console.log("⏰ initializing database...")

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
      return await initValidatedUser(user.id)
    }),
  )
  console.log("-- init all user: ", result)

  console.log("✅ initialized database.")

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
