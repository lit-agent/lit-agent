import { createTRPCRouter, protectedProcedure } from "../trpc";
import { clientMessageSlice } from "@/ds/user";

import { pusherServer } from "@/lib/pusher";
import { $Enums, MessageType, TaskType, UserType } from "@prisma/client";
import { z } from "zod";
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
    .input(
      z.object({
        channelId: z.string(),
        taskId: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { channelId } = input;

      const userJoinedTask = await ctx.prisma.taskTo.create({
        data: {
          userId: ctx.user.id,
          taskId: input.taskId,
          content: input.content,
          status: TaskToStatus.finished,
        },
      });

      const userMessage = await ctx.prisma.message.create({
        data: {
          channelId,
          fromUserId: ctx.user.id,
          text: input.content,
          // todo: toUsers
        },
        ...clientMessageSlice,
      });
      void pusherServer.trigger(channelId, MessageType.ExecTask, userMessage);

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
          // todo: multi model
          text: input.content,
        },
        ...clientMessageSlice,
      });
      void pusherServer.trigger(channelId, MessageType.ExecTask, aiMessage);

      return { userMessage, aiMessage };
    }),

  send: protectedProcedure
    .input(
      z.object({
        text: z.string(),
        channelId: z.string(),
        toUserIds: z.array(z.string()).optional(),
        type: z.nativeEnum(MessageType),
        taskId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { toUserIds, channelId, ...others } = input;
      const message = await ctx.prisma.message.create({
        data: {
          ...others,
          channelId,
          fromUserId: ctx.user.id,
          toUsers: {
            connect: toUserIds?.map((u) => ({
              id: u,
            })),
          },
        },
        ...clientMessageSlice,
      });

      // todo: 用户 与 博主 的私人频道
      console.log("-- trigger: ", { input, message });
      // void pusherServer.trigger(message.fromUserId, input.type, message);
      void pusherServer.trigger(channelId, input.type, message);

      return message;
    }),
});
