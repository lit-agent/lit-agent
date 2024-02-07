import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import {
  getAdminBroadcastId,
  getBroadcastId,
  pusherServer,
  SocketEventType,
} from "@/lib/socket"
import { createRequirementSchema } from "@/ds/requirement"
import { z } from "zod"

import { messageViewSelector } from "@/ds/message.base"

export const taskRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      if (!id) return null
      return ctx.prisma.taskFrom.findUnique({ where: { id } })
    }),

  create: protectedProcedure
    .input(createRequirementSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * 因为每个新发布的任务必然同步到全局聊天室产生一条消息
       * 因此消息与任务是1-0关系
       * 因此直接创建消息，并内嵌任务
       * 最后再基于socket发送消息，并返回消息即可
       */

      const userId = ctx.user.id

      let message
      await ctx.prisma.$transaction(async (prisma) => {
        message = await prisma.message.create({
          data: {
            body: input.body,
            fromUserId: userId,
            task: {
              create: {
                ...input,
                fromUserId: userId,
                room: {
                  create: {},
                },
              },
            },
          },
          ...messageViewSelector,
        })
      })

      void pusherServer.trigger(
        getBroadcastId(userId),
        SocketEventType.Message,
        message,
      )
      return message
    }),
})
