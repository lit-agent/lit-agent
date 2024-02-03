import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TaskFromUncheckedCreateInputSchema } from "prisma/generated/zod";
import { pusherServer } from "@/lib/pusher";
import { Prisma } from ".prisma/client";
import { SocketEventType } from "@/ds/event";
import { MessageType } from "@prisma/client";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(TaskFromUncheckedCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * 因为每个新发布的任务必然同步到全局聊天室产生一条消息
       * 因此消息与任务是1-0关系
       * 因此直接创建消息，并内嵌任务
       * 最后再基于socket发送消息，并返回消息即可
       */
      const message = await ctx.prisma.message.create({
        data: {
          fromUser: {
            connect: {
              id: ctx.user.id,
            },
          },
          type: MessageType.NewTask,
          task: {
            create: input,
          },
        },
        include: {
          fromUser: true,
        },
      });

      void pusherServer.trigger(
        input.fromUserId,
        SocketEventType.NewTask,
        message,
      );
      return message;
    }),
});
