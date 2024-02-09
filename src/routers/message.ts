import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"

import { selectChatTarget, sendMessageSchema } from "@/schema/message"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { messageViewSchema } from "@/schema/message.base"
import { pusherServer } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"

export const messageRouter = createTRPCRouter({
  triggerList: protectedProcedure
    .input(selectChatTarget)
    .mutation(async ({ ctx, input }) => {
      return fetchMessages(ctx.user.id, input.toUserId, input.roomId)
    }),

  list: protectedProcedure
    .input(selectChatTarget)
    .query(async ({ ctx, input }) => {
      return fetchMessages(ctx.user.id, input.toUserId, input.roomId)
    }),

  send: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const fromUserId = ctx.user.id
      const channelId = input.roomId ?? input.toUserId
      if (!channelId) throw new Error("should have either roomId or toUserId")

      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          fromUserId,
        },
        ...messageViewSchema,
      })
      console.log("[MessageRouter] sending socket: ", { input, message })

      // 自己不能发给自己
      if (fromUserId !== input.toUserId)
        void pusherServer.trigger(channelId, SocketEventType.Message, message)

      return message
    }),

  // todo: submit
  // submitImagesTask: protectedProcedure
  //     .input(z.object({task}))

  // todo
  execAction: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      // const { roomId } = input
      // const task = await ctx.prisma.task.findUniqueOrThrow({
      //   where: { roomId },
      //   include: { toUsers: true },
      // })
      //
      // const userMessage = await ctx.prisma.message.create({
      //   data: {
      //     roomId,
      //     fromUserId: ctx.user.id,
      //     body: input.body,
      //     // todo: toUsers
      //   },
      //   ...clientMessageSlice,
      // })
      // void pusherServer.trigger(roomId, SocketEventType.Message, userMessage)
      //
      // const aiMessage = await ctx.prisma.message.create({
      //   data: {
      //     roomId,
      //     fromUserId: USER_JIUGU_AI_ID,
      //     body: {
      //       type: MessageType.GroupLink,
      //       title: "啊哈！\n你也选了这个？\n来群里看看别人都选了什么吧！",
      //       groupId: task.id,
      //     },
      //   },
      //   ...clientMessageSlice,
      // })
      // void pusherServer.trigger(roomId, SocketEventType.Message, aiMessage)
      //
      // return { userMessage, aiMessage }
    }),
})

export const fetchMessages = async (
  userId: string,
  toUserId?: string,
  roomId?: string,
) => {
  const AT_ROOM = {
    room: {
      users: {
        some: {
          id: userId,
        },
      },
    },
  }

  return prisma.message.findMany({
    where: {
      OR: toUserId
        ? [
            { fromUserId: userId, toUserId },
            { fromUserId: toUserId, toUserId: userId },
          ]
        : roomId
          ? [AT_ROOM]
          : [{ fromUserId: userId }, { toUserId: userId }, AT_ROOM],
    },
    orderBy: { createdAt: "desc" },
    ...messageViewSchema,
    //   todo: infinite
  })
}
