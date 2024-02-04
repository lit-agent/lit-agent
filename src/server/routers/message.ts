import { createTRPCRouter, protectedProcedure } from "../trpc";
import { sendTaskMessageSlice } from "@/ds/user";
import {
  MessageCreateInputSchema,
  MessageUncheckedCreateInputSchema,
  MessageWhereInputSchema,
} from "../../../prisma/generated/zod";
import { pusherServer } from "@/lib/pusher";
import { MessageType } from "@prisma/client";

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
      const message = await ctx.prisma.message.create({
        data: input,
        ...sendTaskMessageSlice,
      });

      // todo: 用户 与 博主 的私人频道
      console.log("-- trigger: ", { input, message });
      void pusherServer.trigger(message.fromUser.id, input.type, message);

      return message;
    }),
});
