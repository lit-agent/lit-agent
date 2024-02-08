import { prisma } from "@/lib/db"
import { MessageType } from "@/schema/message.base"

import { ADMIN_PHONE, admins, USER_JIUGU_AI_ID } from "@/config"

export const initUserAfterValidation = async (userId: string) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { validated: true, status: "online" },
  })

  const { rooms, honors, ...jiuguAi } = admins.jiuguAi

  console.log("[User:Validated] 正在发送欢迎语")
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
      fromUser: {
        connectOrCreate: {
          where: { id: USER_JIUGU_AI_ID },
          create: jiuguAi,
        },
      },
      toUser: {
        connect: {
          id: userId,
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
