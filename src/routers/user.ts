import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { z } from "zod"
import { initUserAfterValidation } from "@/lib/user"

import { userListViewSchema } from "@/schema/user.base"
import { userMainViewSchema } from "@/schema/user"
import { prisma } from "@/lib/db"

export const userRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return prisma.user.findMany({ ...userListViewSchema })
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
      const { answer } = input
      const target = '{"4":[0,1,2],"5":[2],"6":[2],"7":[0]}'
      const validateOk = answer === target

      if (validateOk) await initUserAfterValidation(ctx.user.id)

      return validateOk
    }),
})
