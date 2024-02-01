import { createTRPCRouter } from "@/server/trpc";
import { smsRouter } from "@/server/routers/sms";
import { userRouter } from "@/server/routers/user";
import { roomRouter } from "@/server/routers/room";
import { postRouter } from "@/server/routers/post";
import { messageRouter } from "@/server/routers/message";
import { productRouter } from "@/server/routers/product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sms: smsRouter,

  user: userRouter,
  room: roomRouter,
  message: messageRouter,
  product: productRouter,

  send: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
