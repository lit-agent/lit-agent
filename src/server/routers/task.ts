import {
  TaskCreateArgsSchema,
  TaskFindManyArgsSchema,
  TaskUncheckedCreateInputSchema,
} from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  list: publicProcedure
    .input(TaskFindManyArgsSchema)
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        ...input,
        include: {
          users: true,
        },
      });
    }),

  create: protectedProcedure
    .input(TaskUncheckedCreateInputSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(async (db) => {
        const task = await db.task.create({ data: input });
        console.log("-- create task: ", task);
        const userTask = await db.user_Task.create({
          data: {
            userId: ctx.user.id,
            taskId: task.id,
            status: "on",
          },
        });
        console.log("-- create user-task: ", userTask);
        return userTask;
      });
    }),
});
