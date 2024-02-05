import { prisma } from "@/server/db"
import { User, UserType } from "@prisma/client"
import { USER_AI_FOR_ALL_ID, USER_JIUGU_AI_ID } from "@/config"

const init = async () => {
  console.log("⏰ initializing database...")

  let id = USER_AI_FOR_ALL_ID
  let type: UserType = "blogger"
  let data: Partial<User> = {
    type,
    name: "AI",
  }
  await prisma.user.upsert({
    where: { id },
    create: { id, ...data },
    update: { ...data },
  })

  id = USER_JIUGU_AI_ID
  type = "assistant"
  data.type = type
  data.name = "玖姑的AI助手"
  await prisma.user.upsert({
    where: { id },
    create: { id, ...data },
    update: { ...data },
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
