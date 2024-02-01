import PusherServer from "pusher";
import PusherClient from "pusher-js";
import { env } from "src/env";

export const pusherServer = new PusherServer({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});
