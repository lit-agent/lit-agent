import { createTRPCRouter } from "@/server/trpc"
import { smsRouter } from "@/server/routers/sms"
import { userRouter } from "@/server/routers/user"
import { messageRouter } from "@/server/routers/message"
import { taskRouter } from "@/server/routers/task"
import { productRouter } from "./product"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  sms: smsRouter,

  user: userRouter,
  message: messageRouter,
  task: taskRouter,
  product: productRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
