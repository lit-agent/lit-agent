import { z } from "zod";
import { randomUUID } from "crypto";
import { observable } from "@trpc/server/observable";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { EventEmitter } from "events";
import { Prisma } from "@prisma/client";

const message = Prisma.validator<Prisma.MessageArgs>()({
  select: {
    id: true,
    roomId: true,
    userId: true,
    text: true,
    createdAt: true,
  },
});
const user = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    roomId: true,
    name: true,
  },
});
export type MessageType = Prisma.MessageGetPayload<typeof message>;
export type UserType = Prisma.UserGetPayload<typeof user>;

type MessageOutputType = {
  message: MessageType;
  users: UserType[];
};
export enum Events {
  SEND_MESSAGE = "SEND_MESSAGE",
  ENTER_ROOM = "ENTER_ROOM",
}
export const ee = new EventEmitter();

export const roomRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({ text: z.string(), userId: z.string(), roomId: z.string() }),
    )
    .mutation(({ ctx, input }) => {
      const message: MessageType = {
        id: randomUUID(),
        createdAt: new Date(),
        ...input,
      };
      ee.emit(Events.SEND_MESSAGE, message);
      return message;
    }),

  enterRoom: publicProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(({ input }) => {
      ee.emit(Events.ENTER_ROOM, input);
    }),

  findMany: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.room.findMany({ include: { users: true } });
  }),

  findOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const room = await ctx.db.room.findUnique({
      where: { id: input },
      include: { users: true },
    });
    return room;
  }),

  onSendMessage: publicProcedure.subscription(({ ctx }) => {
    return observable<MessageOutputType>((emit) => {
      const onMessage = async (message: MessageType) => {
        const users = await ctx.db.user.findMany();
        // emit data to client
        emit.next({ message, users });
      };
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ee.on(Events.SEND_MESSAGE, onMessage);
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ee.off(Events.SEND_MESSAGE, onMessage);
      };
    });
  }),

  onEnterRoom: publicProcedure.subscription(({ ctx }) => {
    return observable<UserType[]>((emit) => {
      const onMessage = async (data: { roomId: string }) => {
        const users = await ctx.db.user.findMany({
          where: { roomId: data.roomId },
        });
        // emit data to client
        emit.next(users);
      };
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      ee.on(Events.ENTER_ROOM, onMessage);
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        ee.off(Events.ENTER_ROOM, onMessage);
      };
    });
  }),
});
