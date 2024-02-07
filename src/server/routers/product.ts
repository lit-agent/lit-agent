import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"
import { pusherServer, SocketEventType } from "@/lib/socket"
import { createProductSchema } from "@/ds/product"

export const productRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.productFrom.findMany({
      include: {
        fromUser: true,
        toUsers: true,
      },
    })
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

      const product = await ctx.prisma.productFrom.create({
        data: input,
        include: {
          fromUser: true,
        },
      })
      console.log("[ProductRouter] created product: ", product)

      void pusherServer.trigger(ctx.user.id, SocketEventType.Message, product)
      return product
    }),
})
