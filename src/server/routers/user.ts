import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { initUserAfterValidation } from "@/server/user"

import { userViewSelector } from "@/ds/user.base"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.user.findMany({ ...userViewSelector })
  }),

  getUserByPhone: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: input, ...userViewSelector })
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: input, ...userViewSelector })
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

      if (validateOk) await initUserAfterValidation(ctx.user.id)

      return validateOk
    }),
})
