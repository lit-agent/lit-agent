import { createTRPCRouter } from "@/lib/trpc/trpc"
import { smsRouter } from "@/routers/sms"
import { userRouter } from "@/routers/user"
import { messageRouter } from "@/routers/message"
import { taskRouter } from "@/routers/task"
import { productRouter } from "./product"
import { billRouter } from "@/routers/bill"
import { wechatRouter } from "@/routers/wechat"
import { payRouter } from "@/routers/pay"

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
  bill: billRouter,
  pay: payRouter,
  wechat: wechatRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
