import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { initValidatedUser } from "@/server/user"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.user.findMany({})
  }),

  fetch: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: input })
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: input })
    }),

  validate: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { answer } = input
      const target = '{"4":[0,1,2],"5":[2],"6":[2],"7":[0]}'
      const validateOk = answer === target

      const userId = ctx.user.id
      if (validateOk) return await initValidatedUser(userId)

      return { success: false, userId, targetUserId: null }
    }),
})
