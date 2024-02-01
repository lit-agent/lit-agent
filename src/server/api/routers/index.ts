import { postRouter } from "@/server/api/routers/post";
import { createTRPCRouter } from "@/server/api/trpc";
import { smsRouter } from "@/server/api/routers/sms";
import { userRouter } from "@/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  sms: smsRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
