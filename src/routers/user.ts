import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { z } from "zod"

import { userListViewSchema } from "@/schema/user.base"
import { userMainViewSchema } from "@/schema/user"
import { prisma } from "@/lib/db"
import { USER_JIUGU_ID } from "@/config"
import { MessageType } from "@/schema/message.base"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return prisma.user.findMany({
      ...userListViewSchema,
      orderBy: { totalEarnedFire: "desc" },
    })
  }),

  getUserByPhone: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return prisma.user.findUnique({
        where: input,
        ...userListViewSchema,
      })
    }),

  getSelf: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.user.findUnique({
      where: { id: ctx.user.id },
      ...userMainViewSchema,
    })
  }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return prisma.user.findUnique({
        where: input,
        ...userListViewSchema,
      })
    }),

  validate: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { answer } = input
      const target = '{"4":[0,1,2],"5":[2],"6":[2],"7":[0]}'
      const validateOk = answer === target

      if (validateOk) {
        const user = await prisma.user.update({
          where: { id: userId },
          data: { validated: true, status: "online" },
        })

        console.log("[User:Validated] 正在发送欢迎语")
        // 欢迎语不需要使用socket发，因为用户还没到房间
        await prisma.message.create({
          data: {
            isAI: true,
            // 玖姑必存在，在user那步就存在了
            fromUserId: USER_JIUGU_ID,
            toUserId: userId,

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
          },
        })
      }

      return validateOk
    }),
})
