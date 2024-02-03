import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TaskFromUncheckedCreateInputSchema } from "prisma/generated/zod";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(TaskFromUncheckedCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(async (db) => {
        return db.taskFrom.create({ data: input });
      });
    }),
});
