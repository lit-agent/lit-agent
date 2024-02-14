import { prisma } from "@/lib/db"
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"
import { billListViewSchema } from "@/schema/bill"
import { z } from "zod"
import { createInvoiceAction } from "@/lib/pay/actions"

export const billRouter = createTRPCRouter({
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
        value: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        user: { id: userId },
      } = ctx
      const { value, billId } = input

      return createInvoiceAction({ billId, userId, total_amount: value })
    }),

  // myFunc: protectedProcedure.
})
