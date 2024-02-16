import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import {
  createProductSchema,
  productListViewSchema,
  userProductListViewSchema,
} from "@/schema/product"
import { z } from "zod"
import { $Enums, BillStatus } from ".prisma/client"
import { MessageType } from "@/schema/message.base"
import { pusherServer } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"
import { prisma } from "@/lib/db"

export const productRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.product.findUnique({
        where: { id: input.id },
        ...productListViewSchema,
      })
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.product.delete({
        where: { id: input.id },
      })
    }),

  list: publicProcedure.query(async ({ ctx, input }) => {
    return prisma.product.findMany({
      ...productListViewSchema,
    })
  }),

  favor: protectedProcedure
    .input(z.object({ productId: z.string(), isFavored: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { productId, isFavored } = input
      return prisma.userProduct.upsert({
        where: { userId_productId: { userId, productId } },
        create: { userId, productId, isFavored },
        update: { isFavored },
      })
    }),

  getMyUserProduct: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ ctx, input }) => {
      return prisma.userProduct.findUnique({
        where: {
          userId_productId: { userId: ctx.user.id, productId: input.productId },
        },
        ...userProductListViewSchema,
      })
    }),

  listMyUserProducts: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.userProduct.findMany({
      where: { userId: ctx.user.id },
      ...userProductListViewSchema,
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

      const product = await prisma.product.create({
        data: { ...input, fromUserId: ctx.user.id },
        ...productListViewSchema,
      })
      console.log("[ProductRouter] created product: ", product)

      void pusherServer.trigger(ctx.user.id, SocketEventType.Message, product)
      return product
    }),

  redeem: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        productCount: z.number(),
        // type: z.nativeEnum(BillType),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { productId, productCount } = input

      const user = await prisma.user.findUnique({ where: { id: ctx.user.id } })
      if (!user) return { success: false, message: "用户不存在！" }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      })
      if (!product) return { success: false, message: "商品不存在！" }

      if (product.total < productCount)
        return { success: false, message: "商品库存不足！" }

      const cost = productCount * product.price

      if (user.balance < cost) return { success: false, message: "余额不足！" }

      let bill
      await prisma.$transaction(async (prisma) => {
        // 1. 产品库存减少 【锁单】
        await prisma.product.update({
          where: { id: productId },
          data: { total: { decrement: productCount } },
        })

        // 更新用户的钱
        await prisma.user.update({
          where: { id: userId },
          data: { balance: { decrement: cost } },
        })

        // 用户获得产品 （订单）
        bill = await prisma.bill.create({
          data: {
            userId,
            // type,
            status: BillStatus.PAID,
            products: {
              create: [
                {
                  productId,
                  count: 1,
                  price: product.price,
                },
              ],
            },
          },
        })

        // 更新用户购买关系
        await prisma.userProduct.upsert({
          where: { userId_productId: { userId, productId } },
          create: { userId, productId, bought: productCount },
          update: { bought: { increment: productCount } },
        })

        // 在频道里通知博主 todo: 先用文字，后续用封面
        await prisma.message.create({
          data: {
            fromUserId: user.id,
            toUserId: product.fromUserId,
            body: {
              type: MessageType.BillLink,
              value: bill.id,
            },
          },
        })
      })

      // 返回 bill
      return { success: true, data: bill }
    }),
})
