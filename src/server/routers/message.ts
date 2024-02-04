import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sendTaskMessageSlice } from "@/ds/user";

import { pusherServer } from "@/lib/pusher";
import { MessageType } from "@prisma/client";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: {
          OR: [{ roomId: "ALL" }, { roomId: input.roomId }],
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
          OR: [{ roomId: "ALL" }, { roomId: input.roomId }],
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
        roomId: z.string().optional(),
        toUserIds: z.array(z.string()).optional(),
        type: z.nativeEnum(MessageType),
        taskId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const message = await ctx.prisma.message.create({
        data: {
          ...input,
          fromUserId: ctx.user.id,
          toUsers: {
            connect: input.toUserIds?.map((u) => ({
              id: u,
            })),
          },
        },
        ...sendTaskMessageSlice,
      });

      // todo: 用户 与 博主 的私人频道
      console.log("-- trigger: ", { input, message });
      void pusherServer.trigger(message.fromUser.id, input.type, message);

      return message;
    }),
});
