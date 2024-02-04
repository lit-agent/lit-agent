import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clientMessageSlice } from "@/ds/user";

import { pusherServer } from "@/lib/pusher";
import { $Enums, UserType } from "@prisma/client";
import { z } from "zod";
import { SegmentType, sendMessageSchema } from "@/ds/message";
import { SocketEventType } from "@/ds/socket";
import TaskToStatus = $Enums.TaskToStatus;

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ channelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          OR: [{ channelId: "ALL" }, { channelId: input.channelId }],
        },
        orderBy: { createdAt: "asc" },
        ...clientMessageSlice,
        //   todo: infinite
      });
    }),

  list: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          OR: [{ channelId: "ALL" }, { channelId: input.roomId }],
        },
        orderBy: { createdAt: "asc" },
        ...clientMessageSlice,
        //   todo: infinite
      });
    }),

  execAction: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const { channelId, taskId, body } = input;

      const task = await ctx.prisma.taskFrom.findUniqueOrThrow({
        where: { id: taskId },
        include: { toUsers: true },
      });

      const userJoinedTask = await ctx.prisma.taskTo.create({
        data: {
          userId: ctx.user.id,
          taskId: task.id,
          status: TaskToStatus.finished,
        },
      });

      const userMessage = await ctx.prisma.message.create({
        data: {
          channelId,
          fromUserId: ctx.user.id,
          body: input.body,
          // todo: toUsers
        },
        ...clientMessageSlice,
      });
      void pusherServer.trigger(
        channelId,
        SocketEventType.Message,
        userMessage,
      );

      const aiMessage = await ctx.prisma.message.create({
        data: {
          channelId,
          fromUser: {
            connectOrCreate: {
              where: { id: "ai" },
              create: {
                id: "ai",
                name: "玖姑的AI助手",
                image: "/user-jiugu.png",
                type: UserType.assistant,
              },
            },
          },
          body: [
            {
              type: SegmentType.text,
              content: "啊哈！\n你也选了这个？\n来群里看看别人都选了什么吧！",
            },
            { type: SegmentType.groupLink, content: task },
          ],
        },
        ...clientMessageSlice,
      });
      void pusherServer.trigger(channelId, SocketEventType.Message, aiMessage);

      return { userMessage, aiMessage };
    }),

  send: protectedProcedure
    .input(sendMessageSchema)
    .mutation(async ({ ctx, input }) => {
      const { channelId, ...others } = input;
      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          fromUserId: ctx.user.id,
        },
        ...clientMessageSlice,
      });

      console.log("-- trigger: ", { input, message });
      void pusherServer.trigger(channelId, SocketEventType.Message, message);

      return message;
    }),
});
