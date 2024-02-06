import { createTRPCRouter, protectedProcedure } from "../trpc"

import { getBroadcastRoomId, pusherServer, SocketEventType } from "@/lib/socket"
import { $Enums } from "@prisma/client"
import { z } from "zod"
import { MessageType } from "@/ds/message.base"
import { clientMessageSlice, sendMessageSchema } from "@/ds/message"
import { USER_JIUGU_AI_ID } from "@/const"
import { prisma } from "@/server/db"

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return fetchMessages(input.roomId)
    }),

  list: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return fetchMessages(input.roomId)
    }),

  execAction: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const { roomId } = input
      const task = await ctx.prisma.taskFrom.findUniqueOrThrow({
        where: { roomId },
        include: { toUsers: true },
      })

      const userMessage = await ctx.prisma.message.create({
        data: {
          roomId,
          fromUserId: ctx.user.id,
          body: input.body,
          // todo: toUsers
        },
        ...clientMessageSlice,
      })
      void pusherServer.trigger(roomId, SocketEventType.Message, userMessage)

      const aiMessage = await ctx.prisma.message.create({
        data: {
          roomId,
          fromUserId: USER_JIUGU_AI_ID,
          body: {
            type: MessageType.GroupLink,
            title: "啊哈！\n你也选了这个？\n来群里看看别人都选了什么吧！",
            groupId: task.id,
          },
        },
        ...clientMessageSlice,
      })
      void pusherServer.trigger(roomId, SocketEventType.Message, aiMessage)

      return { userMessage, aiMessage }
    }),

  send: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          fromUserId: ctx.user.id,
        },
        ...clientMessageSlice,
      })

      console.log("-- trigger: ", { input, message })
      void pusherServer.trigger(input.roomId, SocketEventType.Message, message)

      return message
    }),
})

export const fetchMessages = async (roomId: string) =>
  prisma.message.findMany({
    where: {
      OR: [{ roomId: await getBroadcastRoomId() }, { roomId }],
    },
    orderBy: { createdAt: "asc" },
    ...clientMessageSlice,
    //   todo: infinite
  })
