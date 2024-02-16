import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"
import { z } from "zod"
import { prisma } from "@/lib/db"

import { paymentListViewSchema } from "@/schema/pay"
import { paymentDetailViewSchema } from "@/schema/payment-detail"

export const payRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ paymentId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.user.id
      const { paymentId } = input
      const payment = await prisma.payment.findUniqueOrThrow({
        where: { id: paymentId },
        ...paymentDetailViewSchema,
      })
      if (payment.userId !== userId) throw new Error("You have no permission")

      return payment
    }),
})
