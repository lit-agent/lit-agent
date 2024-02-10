import { prisma } from "@/lib/db"
import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"
import { billListViewSchema } from "@/schema/bill"

export const billRouter = createTRPCRouter({
  listMyBills: protectedProcedure.query(async ({ ctx, input }) => {
    return prisma.bill.findMany({
      where: { userId: ctx.user.id },
      ...billListViewSchema,
    })
  }),
})
