import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { z } from "zod"

import { userListViewSchema, userSafeUpdateSchema } from "@/schema/user.base"
import { userMainViewSchema } from "@/schema/user"
import { prisma } from "@/lib/db"
import { JIUGU_ID, MSG_RENAME_LIMITATION, NEW_USER_REWARD } from "@/config"
import { MessageType } from "@/schema/message.base"
import { SMS_PROVIDER_ID } from "@/lib/sms"
import { ValidateUserResult } from "@/schema/auth"

export const userRouter = createTRPCRouter({
  validateUser: publicProcedure
    .input(z.object({ phone: z.string(), code: z.string() }))
    .mutation<ValidateUserResult>(async ({ ctx, input }) => {
      const { phone, code } = input
      const accountInDB = await prisma.account.findUnique({
        where: {
          provider_providerAccountId: {
            provider: SMS_PROVIDER_ID,
            providerAccountId: phone,
          },
        },
        select: {
          access_token: true,
          user: { select: { validated: true } },
        },
      })
      if (!accountInDB) return ValidateUserResult.NoAccount
      if (accountInDB.access_token !== code) return ValidateUserResult.WrongCode
      if (!accountInDB.user.validated) return ValidateUserResult.NotValidatedYet
      return ValidateUserResult.Validated
    }),

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
    return prisma.user.findUniqueOrThrow({
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

  validateAnswer: publicProcedure
    .input(
      z.object({
        phone: z.string(),
        code: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { answer } = input
      const target = '{"4":[0,1,2],"5":[2],"6":[2],"7":[0]}'
      const validateOk = answer === target

      if (validateOk) {
        const account = await prisma.account.findUniqueOrThrow({
          where: {
            provider_providerAccountId: {
              provider: SMS_PROVIDER_ID,
              providerAccountId: input.phone,
            },
            access_token: input.code,
          },
          select: {
            user: {
              select: {
                id: true,
                validated: true,
              },
            },
          },
        })
        const userId = account.user.id

        if (!account.user?.validated) {
          const user = await prisma.user.update({
            where: { id: userId },
            data: {
              validated: true,
              status: "online",
              balance: { increment: NEW_USER_REWARD },
              totalEarnedFire: { increment: NEW_USER_REWARD },
              currentEarnedFire: { increment: NEW_USER_REWARD },
            },
          })

          console.log("[User:Validated] 正在发送欢迎语")
          // 欢迎语不需要使用socket发，因为用户还没到房间
          await prisma.message.create({
            data: {
              // 2024-02-10 更新，不要 ai 了
              isAI: false,
              // 玖姑必存在，在user那步就存在了
              fromUserId: JIUGU_ID,
              toUserId: userId,

              body: {
                type: MessageType.Plain,
                title:
                  "Yo！恭喜你成为姑的friend！\n\n" +
                  "在这里你可以随时跟我的AI替身闲聊（放心它不会瞎编），所有的聊天记录我都能看到，如果有值得回复的问题我会亲自回复\n\n" +
                  "商务合作留言请加 #合作 标签\n" +
                  "商品售后留言请加 #售后 标签\n\n" +
                  "常见问题：\n" +
                  "[如何直接联系玖姑本人？](/contact)\n" +
                  "[什么是火值？如何赚火值？](/about/fire)",
              },
            },
          })
        }
      }

      return validateOk
    }),

  safeUpdate: protectedProcedure
    .input(userSafeUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = ctx.user

      if (input.name) {
        const user = await prisma.user.findUniqueOrThrow({ where: { id } })
        if (
          user.nameUpdated &&
          +new Date() - +user.nameUpdated < 24 * 60 * 60 * 30
        )
          throw new Error(MSG_RENAME_LIMITATION)
        return await prisma.user.update({
          where: { id },
          data: { ...input, nameUpdated: new Date() },
        })
      }

      return await prisma.user.update({ where: { id }, data: input })
    }),
})
