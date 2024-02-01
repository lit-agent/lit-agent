import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const messageRouter = createTRPCRouter({
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
        include: { user: true },
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
      return ctx.prisma.message.create({
        data: { ...input, userId: ctx.user.id },
      });
    }),
});
