import PusherServer from "pusher"
import { env } from "@/env"
import PusherClient from "pusher-js"

export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
})

/**
 * 每次创建都会消耗一个 connection 名额，所以用函数式启动应该会好一点
 * ref: https://docs.bird.com/pusher/channels/channels/limits/how-are-concurrent-connections-counted
 */
export const initPusherClient = () =>
  new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  })
