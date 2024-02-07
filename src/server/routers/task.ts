import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { getBroadcastId, pusherServer, SocketEventType } from "@/lib/socket"
import { createRequirementSchema } from "@/ds/requirement"
import { z } from "zod"

import { MessageType, messageViewSelector } from "@/ds/message.base"
import { taskViewSelector } from "@/ds/task"

export const taskRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.taskFrom.findUniqueOrThrow({
        where: { id: input.id },
        ...taskViewSelector,
      })
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

  getUserTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.taskTo.findUnique({
        where: { taskId_userId: { userId: ctx.user.id, taskId: input.taskId } },
      })
    }),

  submitImages: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        images: z.array(z.string()).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user, prisma } = ctx
      const { taskId, images } = input

      const task = await prisma.taskFrom.findUniqueOrThrow({
        where: { id: taskId },
        ...taskViewSelector,
      })
      const { value } = task

      await prisma.$transaction(async (prisma) => {
        // 建立用户与任务之间的关系
        await prisma.taskTo.create({
          data: {
            userId: ctx.user.id,
            taskId: task.id,
          },
        })

        // 更新用户的火值
        await prisma.user.update({
          where: { id: user.id },
          data: {
            currentBalance: { increment: value },
            historyBalance: { increment: value },
          },
        })

        // 发送消息到博主频道
        await prisma.message.create({
          data: {
            fromUserId: user.id,
            toUserId: task.fromUser.id,
            body: { type: MessageType.Images, images },
          },
        })

        // 发送到群聊（群聊不可以解散）
        const room = task.room
        if (room) {
          await prisma.message.create({
            data: {
              fromUserId: user.id,
              roomId: room.id,
              body: { type: MessageType.Images, images },
            },
          })
        }
      })

      return true
    }),
})
