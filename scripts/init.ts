import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"

import { ADMIN_PHONE, USER_JIUGU_AI_ID } from "@/const"

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
  const adminUser = users.find((u) => u.phone === ADMIN_PHONE)!
  await prisma.follow.deleteMany()
  await prisma.follow.createMany({
    data: users
      .filter((u) => u.id !== adminUser.id)
      .map((u) => ({
        followingId: u.id,
        followedById: adminUser.id,
      })),
  })

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
