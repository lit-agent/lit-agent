import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { z } from "zod"

import { MessageType, messageViewSchema } from "@/schema/message.base"
import {
  createTaskSchema,
  taskViewSchema,
  userTaskViewSchema,
} from "@/schema/task"
import { pusherServer } from "@/lib/socket/config"
import { getBroadcastId } from "@/lib/socket/helpers"
import { SocketEventType } from "@/lib/socket/events"
import { prisma } from "@/lib/db"
import { UserTaskStatus } from "@prisma/client"

export const taskRouter = createTRPCRouter({
  listTasks: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.task.findMany({
      ...taskViewSchema,
    })
  }),

  listUserTasks: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.userTask.findMany({
      where: { userId: ctx.user.id },
      ...userTaskViewSchema,
    })
  }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.task.findUniqueOrThrow({
        where: input,
        ...taskViewSchema,
      })
    }),

  create: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * 因为每个新发布的任务必然同步到全局聊天室产生一条消息
       * 因此消息与任务是1-0关系
       * 因此直接创建消息，并内嵌任务
       * 最后再基于socket发送消息，并返回消息即可
       */

      const userId = ctx.user.id

      let message
      await prisma.$transaction(async (prisma) => {
        const invitation = input.resultOfGroupInvitation

        const task = await prisma.task.create({
          data: {
            ...input,
            fromUserId: userId,
            status: "on",

            // 显示群聊
            result: invitation?.length
              ? {
                  type: "GroupInvitation",
                  value: invitation,
                }
              : undefined,
          },
        })

        message = await prisma.message.create({
          data: {
            fromUserId: userId,
            taskId: task.id,
            body: {
              type: MessageType.Task,
              id: task.id,
            },
          },
          ...messageViewSchema,
        })

        await prisma.userTask.create({
          data: {
            userId,
            taskId: task.id,
            status: "goon",
          },
        })

        void pusherServer.trigger(
          getBroadcastId(userId),
          SocketEventType.Message,
          message,
        )
      })

      return message
    }),

  getUserTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await prisma.userTask.findUnique({
        where: { taskId_userId: { userId: ctx.user.id, taskId: input.taskId } },
      })
    }),

  joinTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.userTask.upsert({
        where: { taskId_userId: { userId: ctx.user.id, taskId: input.taskId } },
        create: { userId: ctx.user.id, taskId: input.taskId, status: "goon" },
        update: {},
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
      const { user } = ctx
      const { taskId, images } = input

      const task = await prisma.task.findUniqueOrThrow({
        where: { id: taskId },
        ...taskViewSchema,
      })
      const { value } = task

      await prisma.$transaction(async (prisma) => {
        // 用户完成任务
        await prisma.userTask.update({
          where: {
            taskId_userId: {
              userId: ctx.user.id,
              taskId: task.id,
            },
          },
          data: {
            status: UserTaskStatus.finished,
          },
        })

        // 2024-02-10：更新火值要由博主端审核
        // 更新用户的火值
        // await prisma.user.update({
        //   where: { id: user.id },
        //   data: {
        //     totalEarnedFire: { increment: value },
        //     currentEarnedFire: { increment: value },
        //     balance: { increment: value },
        //   },
        // })

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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      return await prisma.task.delete({ where: { id } })
    }),
})
