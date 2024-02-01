import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx, input }) => {
    return ctx.prisma.product.findMany({
      include: { buyers: true, issuer: true },
    });
  }),
});
