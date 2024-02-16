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
import { findWechatAccount } from "@/lib/wechat/auth"
import { Validation } from "@/app/(auth)/validation/config"
import { isEqual } from "lodash"

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

  getAuthData: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { phone, accounts } = await prisma.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      select: {
        phone: true,
        accounts: { select: { access_token: true, provider: true } },
      },
    })
    const code = accounts.find(
      (a) => a.provider === SMS_PROVIDER_ID,
    )?.access_token

    return {
      phone,
      code,
    }
  }),

  getSelf: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.user.id
    console.log("[getSelf]: ", { userId })
    return prisma.user.findUniqueOrThrow({
      where: { id: userId },
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

  validateAnswer: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { answer } = input

      const target = { 4: [0, 1, 2], 5: [2], 6: [2], 7: [0] }
      const parsed = JSON.parse(answer) as Validation
      const passed = Object.keys(parsed).every((k) =>
        isEqual(parsed[k].value, target[k]),
      )

      await prisma.validation.create({
        data: {
          userId,
          passed,
          items: {
            create: Object.keys(parsed).map((k) => ({
              index: Number(k),
              createdAt: parsed[k].date,
              answer: parsed[k].value,
            })),
          },
        },
      })

      if (passed) {
        if (!ctx.user?.validated) {
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

          console.log("[User] updated user: ", user)
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

      return passed
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
