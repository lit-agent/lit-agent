import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pusherServer } from "@/lib/pusher";
import { MessageType } from "@prisma/client";
import { TaskChoiceType } from ".prisma/client";
import { createTaskSchema } from "@/ds/task";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createTaskSchema)
    .mutation(async ({ ctx, input }) => {
      /**
       * 因为每个新发布的任务必然同步到全局聊天室产生一条消息
       * 因此消息与任务是1-0关系
       * 因此直接创建消息，并内嵌任务
       * 最后再基于socket发送消息，并返回消息即可
       */
      const { choices, ...others } = input;
      const inputInDB = {
        ...others,
        choices: {
          create: (JSON.parse(input.content) as string[]).map((content) => ({
            type: TaskChoiceType.Text,
            content,
          })),
        },
      };

      const message = await ctx.prisma.message.create({
        data: {
          fromUser: {
            connect: {
              id: ctx.user.id,
            },
          },
          type: MessageType.NewTask,
          task: {
            create: inputInDB,
          },
        },
        include: {
          fromUser: true,
        },
      });

      void pusherServer.trigger(ctx.user.id, MessageType.NewTask, message);
      return message;
    }),
});
