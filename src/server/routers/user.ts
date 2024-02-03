import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserFromPhone: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { phone: input } });
    }),

  fetch: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: input });
    }),

  get: publicProcedure
    .input(
      z.object({
        uid: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.findFirst({ where: { id: input.uid } });
    }),

  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.prisma.user.findMany({});
  }),

  validate: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { answer } = input;
      const target = '{"q1":[0,1,2],"q2":[2],"q3":[2],"q4":[0]}';
      const result = answer === target;
      console.log("-- validate: ", {
        session: ctx.session,
        answer,
        target,
        result,
      });
      const uid = ctx.session.user.id;
      if (result) {
        const userInfo = await ctx.prisma.user.findFirst({
          where: { id: uid },
          select: { validated: true },
        });
        if (!userInfo?.validated) {
          await ctx.prisma.user.update({
            where: { id: uid },
            data: { validated: true },
          });
        }
      }
      return result;
    }),
});
