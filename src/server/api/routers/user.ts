import { JIUGU_AI_ID } from "@/const";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(
      z.object({
        uid: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findFirst({ where: { id: input.uid } });
    }),

  list: publicProcedure.query(async ({ ctx, input }) => {
    return ctx.db.user.findMany({});
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
        const userInfo = await ctx.db.user.findFirst({
          where: { id: uid },
          select: { validated: true },
        });
        if (!userInfo?.validated) {
          const roomId = `${uid}-jiugu`;
          console.log("-- transaction: ", { uid });
          await ctx.db.user.update({
            where: { id: uid },
            data: { validated: true },
          });
          ctx.db.$transaction([
            ctx.db.room.create({ data: { id: roomId } }),

            ctx.db.message.createMany({
              data: [
                {
                  userId: JIUGU_AI_ID,
                  roomId,
                  text: "Hello！我是你的玖姑助手，恭喜你获得火伴身份，以及我们赠送的10火值，你可以在xxx查看你的火值数额，并在xxx进行兑换！",
                },
              ],
            }),
          ]);
        }
      }
      return result;
    }),
});
