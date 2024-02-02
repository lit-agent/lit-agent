import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { pusherServer } from "@/lib/pusher";

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(
      z.object({
        roomId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.roomId) return [];

      return ctx.prisma.message.findMany({
        where: { roomId: input.roomId },
        include: { sender: true },
        orderBy: { createdAt: "desc" },
        //   todo: infinite
      });
    }),

  list: protectedProcedure
    .input(
      z.object({
        roomId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!input.roomId) return [];

      return ctx.prisma.message.findMany({
        where: { roomId: input.roomId },
        include: { sender: true },
        orderBy: { createdAt: "desc" },
        //   todo: infinite
      });
    }),

  send: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        text: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // todo: socket

      const message = await ctx.prisma.message.create({
        data: { ...input, userId: ctx.user.id },
        include: { user: true },
      });

      void pusherServer.trigger(input.roomId, "user:sendMessage", message);

      return message;
    }),
});
