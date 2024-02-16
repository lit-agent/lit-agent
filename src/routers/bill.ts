import { prisma } from "@/lib/db"
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"
import { billListViewSchema } from "@/schema/bill"
import { z } from "zod"
import { createPaymentAction } from "@/lib/pay/actions"
import { $Enums, BillStatus } from ".prisma/client"
import { sum } from "lodash"
import { MessageType } from "@/schema/message.base"
import PaymentStatus = $Enums.PaymentStatus

export const billRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ billId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await prisma.bill.delete({ where: { id: input.billId } })
    }),

  create: protectedProcedure
    .input(z.object({ productId: z.string(), productPrice: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { productId, productPrice } = input

      return await prisma.bill.create({
        data: {
          userId,
          status: BillStatus.PAYING,
          products: {
            create: [
              {
                productId,
                price: productPrice,
                count: 1,
              },
            ],
          },
        },
      })
    }),

  redeem: protectedProcedure
    .input(z.object({ billId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id
      const { billId } = input

      try {
        const user = await prisma.user.findUniqueOrThrow({
          where: { id: userId },
        })
        let bill = await prisma.bill.findUniqueOrThrow({
          where: { id: billId },
          ...billListViewSchema,
        })

        await prisma.$transaction(async (prisma) => {
          // 更新用户的钱
          const cost = sum(bill.products.map((p) => p.price * p.count))
          if (cost > user.balance) throw new Error("火值不足！")
          await prisma.user.update({
            where: { id: userId },
            data: { balance: { decrement: cost } },
          })

          await Promise.all(
            bill.products.map(async (p) => {
              const product = await prisma.product.findUniqueOrThrow({
                where: { id: p.productId },
              })
              if (product.sold + p.count > product.total)
                throw new Error("库存紧缺！")
              const productId = product.id
              const count = p.count

              // 1. 产品库存减少 【锁单】
              await prisma.product.update({
                where: { id: productId },
                data: { sold: { increment: count } },
              })

              // 更新用户购买关系
              await prisma.userProduct.upsert({
                where: { userId_productId: { userId, productId } },
                create: { userId, productId, bought: count },
                update: { bought: { increment: count } },
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
            }),
          )

          // 用户订单成功
          bill = await prisma.bill.update({
            where: { id: billId },
            data: { status: BillStatus.PAID },
            ...billListViewSchema,
          })
        })
        return { success: true }
      } catch (e) {
        return { success: false, message: (e as { message: string }).message }
      }
    }),

  listMyBills: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.bill.findMany({
      where: { userId: ctx.user.id },
      ...billListViewSchema,
    })
  }),

  charge: protectedProcedure
    .input(
      z.object({
        billId: z.string().optional(),
        paymentId: z.string().optional(),
        value: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        user: { id: userId },
      } = ctx
      const { value, paymentId, billId } = input

      await prisma.payment.create({
        data: {
          id: paymentId,
          billId,
          value,
          userId,
          status: PaymentStatus.CREATING,
        },
      })

      return createPaymentAction({ paymentId, userId, total_amount: value })
    }),

  // myFunc: protectedProcedure.
})
