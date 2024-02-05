import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { z } from "zod"
import { validationSuccessCallback } from "@/server/user"

export const userRouter = createTRPCRouter({
  getUserFromPhone: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { phone: input } })
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

  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.user.findMany({})
  }),

  followUser: protectedProcedure
    .input(z.object({ bloggerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.userFollow.upsert({
        where: {
          followedById_followingId: {
            followingId: ctx.user.id,
            followedById: input.bloggerId,
          },
        },
        create: { followingId: ctx.user.id, followedById: input.bloggerId },
        update: {},
      })
    }),

  // listFans: protectedProcedure.query(async ({ ctx }) => {
  //   return ctx.prisma.user.findMany({})
  // }),

  validate: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { answer } = input
      const target = '{"4":[0,1,2],"5":[2],"6":[2],"7":[0]}'
      const result = answer === target

      const uid = ctx.session.user.id
      if (result) await validationSuccessCallback(uid)

      return result
    }),
})
