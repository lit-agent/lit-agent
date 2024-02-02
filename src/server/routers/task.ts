import {
  TaskCreateArgsSchema,
  TaskFindManyArgsSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  list: publicProcedure
    .input(TaskFindManyArgsSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        ...input,
        include: {
          buyers: true,
          issuer: true,
          room: { include: { users: true, messages: true } },
        },
      });
    }),

  create: protectedProcedure
    .input(TaskCreateArgsSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.create(input);
    }),
});
