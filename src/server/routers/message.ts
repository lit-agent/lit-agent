import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sendTaskMessageSlice } from "@/ds/user";
import {
  MessageCreateInputSchema,
  MessageUncheckedCreateInputSchema,
  MessageWhereInputSchema,
} from "../../../prisma/generated/zod";

export const messageRouter = createTRPCRouter({
  fetch: protectedProcedure
    .input(MessageWhereInputSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: input,
        orderBy: { createdAt: "asc" },
        ...sendTaskMessageSlice,
        //   todo: infinite
      });
    }),

  list: protectedProcedure
    .input(MessageWhereInputSchema)
    .query(async ({ ctx, input }) => {
      return ctx.prisma.message.findMany({
        where: input,
        orderBy: { createdAt: "asc" },
        ...sendTaskMessageSlice,
        //   todo: infinite
      });
    }),

  send: protectedProcedure
    .input(MessageCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      // todo: socket

      const message = await ctx.prisma.message.create({
        data: input,
        ...sendTaskMessageSlice,
      });

      // todo
      // void pusherServer.trigger(input.roomId, "user:sendMessage", message);

      return message;
    }),
});
