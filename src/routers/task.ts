import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { z } from "zod"

import { MessageType, messageViewSchema } from "@/schema/message.base"
import {
  createTaskSchema,
  taskListViewSchema,
  userTaskViewSchema,
} from "@/schema/task"
import { pusherServer } from "@/lib/socket/config"
import { getBroadcastId } from "@/lib/socket/helpers"
import { SocketEventType } from "@/lib/socket/events"
import { prisma } from "@/lib/db"
import { UserTaskStatus } from "@prisma/client"
import { descOrder } from "@/routers/_utils"

export const taskRouter = createTRPCRouter({
  listTasks: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.task.findMany({
      ...taskListViewSchema,
      ...descOrder,
    })
  }),

  listMyUserTasks: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.userTask.findMany({
      where: { userId: ctx.user.id },
      ...userTaskViewSchema,
      ...descOrder,
    })
  }),

  listUserTasksByTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.userTask.findMany({
        where: { taskId: input.taskId },
        ...userTaskViewSchema,
        ...descOrder,
      })
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.task.findUniqueOrThrow({
        where: input,
        ...taskListViewSchema,
      })
    }),

  getUserTask: protectedProcedure
    .input(z.object({ taskId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await prisma.userTask.findUnique({
        where: { taskId_userId: { userId: ctx.user.id, taskId: input.taskId } },
        ...userTaskViewSchema,
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
        delete input.resultOfGroupInvitation

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

        void pusherServer.trigger(
          getBroadcastId(userId),
          SocketEventType.Message,
          message,
        )
      })

      return message
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
        ...taskListViewSchema,
      })

      await prisma.$transaction(async (prisma) => {
        // 用户执行任务
        await prisma.userTask.create({
          data: {
            userId: ctx.user.id,
            taskId: task.id,
            images,
            status: UserTaskStatus.goon,
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

  bloggerVerifyUserTask: protectedProcedure
    .input(
      z.object({ taskId: z.string(), userId: z.string(), passed: z.boolean() }),
    )
    .mutation(async ({ input }) => {
      const { userId, taskId, passed } = input

      const task = await prisma.task.findUniqueOrThrow({
        where: { id: taskId },
      })

      await prisma.$transaction(async (prisma) => {
        await prisma.userTask.update({
          where: { taskId_userId: { userId, taskId } },
          data: { passed, status: UserTaskStatus.finished },
        })

        if (passed) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              currentEarnedFire: { increment: task.value },
              totalEarnedFire: { increment: task.value },
              balance: { increment: task.value },
            },
          })
        }
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      return await prisma.task.delete({ where: { id } })
    }),
})
