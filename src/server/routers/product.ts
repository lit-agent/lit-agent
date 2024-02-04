import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { pusherServer } from "@/lib/pusher";
import { MessageType, TaskType } from "@prisma/client";
import { z } from "zod";
import { TaskChoiceType, TaskStatus } from ".prisma/client";

export const createProductSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  images: z.array(z.string()).optional(),
  detail: z.string(),
  price: z.number(),
  isOnsite: z.boolean(),
  isSelfOperating: z.boolean(),
  isReturnable: z.boolean(),
  isReservationRequired: z.boolean(),
  total: z.number(),
  fromUserId: z.string(),
});

export const productRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.productFrom.findMany({
      include: {
        fromUser: true,
        toUsers: true,
      },
    });
  }),

  create: protectedProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * 因为每个新发布的任务必然同步到全局聊天室产生一条消息
       * 因此消息与任务是1-0关系
       * 因此直接创建消息，并内嵌任务
       * 最后再基于socket发送消息，并返回消息即可
       */

      const message = await ctx.prisma.productFrom.create({
        data: input,
        include: {
          fromUser: true,
        },
      });

      void pusherServer.trigger(ctx.user.id, MessageType.NewTask, message);
      return message;
    }),
});
