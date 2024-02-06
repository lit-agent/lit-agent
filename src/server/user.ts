import { prisma } from "@/server/db"
import { MessageType } from "@/ds/message.base"

import { ADMIN_PHONE, USER_JIUGU_AI_ID } from "@/const"
import { getChatId } from "@/lib/socket"

export const initRegisteredUser = async ({ phone }: { phone: string }) => {
  //   创建用户
  const user = await prisma.user.create({
    data: {
      name: "sms-" + phone,
      phone,
      phoneVerified: new Date(),
      status: "online",

      // 连接 user - account
      // todo: 连接 user - verificationToken - session
      accounts: {
        connect: {
          provider_providerAccountId: {
            provider: "sms",
            providerAccountId: phone,
          },
        },
      },
    },
  })

  return user
}

export const fetchAdminUser = () =>
  prisma.user.findUnique({
    where: { phone: ADMIN_PHONE },
  })

export const initValidatedUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { validated: true },
  })

  const adminUser = await fetchAdminUser()
  if (!adminUser) throw new Error("管理员账号不存在！")

  const targetUserId = adminUser.id
  if (userId == targetUserId) return { success: true, targetUserId }

  console.log("-- 正在关注博主")
  const roomId = getChatId(userId, targetUserId)

  await prisma.userRelation.upsert({
    where: {
      fromUserId_toUserId: { fromUserId: userId, toUserId: targetUserId },
    },
    create: { fromUserId: userId, toUserId: targetUserId, isFans: true },
    update: {},
  })

  let room = await prisma.room.findUnique({ where: { id: roomId } })
  if (!room) {
    await prisma.room.create({
      data: {
        users: {
          connect: [{ id: userId }, { id: targetUserId }],
        },
        id: roomId,
      },
    })
    console.log("-- 正在发送欢迎语")
    // 欢迎语不需要使用socket发，因为用户还没到房间
    await prisma.message.create({
      data: {
        body: {
          type: MessageType.Plain,
          title:
            "Yo！恭喜你成为姑的Friend！\n\n" +
            "在这里你可以随时跟我的AI替身闲聊（放心它不会瞎编），所有的聊天记录我都能看到，如果有值得回复的问题我会亲自回复\n\n" +
            "商务合作留言请加 #合作 标签\n" +
            "商品售后留言请加 #售后 标签\n\n" +
            "常见问题：\n" +
            "[如何直接联系玖姑本人？](https://baidu.com)\n" +
            "[什么是火值？如何赚火值？](https://baidu.com)",
        },
        fromUserId: USER_JIUGU_AI_ID,
        toUserId: userId,
      },
    })
  }

  console.log("-- finished -- ")
  return {
    success: true,
    userId,
    targetUserId,
  }
}
