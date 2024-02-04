import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sendTaskMessageSlice } from "@/ds/user";

import { pusherServer } from "@/lib/pusher";
import { MessageType } from "@prisma/client";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ channelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          OR: [{ channelId: "ALL" }, { channelId: input.channelId }],
        },
        orderBy: { createdAt: "asc" },
        ...sendTaskMessageSlice,
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
        ...sendTaskMessageSlice,
        //   todo: infinite
      });
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
      const { toUserIds, ...others } = input;
      const message = await ctx.prisma.message.create({
        data: {
          ...others,
          channelId: input.channelId,
          fromUserId: ctx.user.id,
          toUsers: {
            connect: toUserIds?.map((u) => ({
              id: u,
            })),
          },
        },
        ...sendTaskMessageSlice,
      });

      // todo: 用户 与 博主 的私人频道
      console.log("-- trigger: ", { input, message });
      // void pusherServer.trigger(message.fromUserId, input.type, message);
      void pusherServer.trigger(
        `${message.fromUserId}-jiugu`,
        input.type,
        message,
      );

      return message;
    }),
});
