import { createTRPCRouter, publicProcedure } from "@/lib/trpc/trpc"
import { billListViewSchema } from "@/schema/bill"

export const billRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.bill.findMany({
      ...billListViewSchema,
    })
  }),
})
