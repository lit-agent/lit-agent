import { createTRPCRouter } from "@/server/api/trpc";
import { smsRouter } from "@/server/api/routers/sms";
import { userRouter } from "@/server/api/routers/user";
import { roomRouter } from "@/server/api/routers/room";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sms: smsRouter,

  user: userRouter,
  room: roomRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
