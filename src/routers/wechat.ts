import { createTRPCRouter, protectedProcedure } from "@/lib/trpc/trpc"
import { bindWxOpenIdToUser, getOpenId, sign } from "@/lib/wx/wx-auth"
import { sendSubscribeNotify } from "@/lib/wx/wx-notify"
import { SubscribeNotifySchema } from "@/lib/wx/schema"
import { z } from "zod"
import singletonTokenInstance from "@/lib/wx/singleton-token"

export const wechatRouter = createTRPCRouter({
  bindWxOpenIdToUser: protectedProcedure
    .input(z.object({ code: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const openId = await getOpenId(input.code)
      if (!openId) {
        throw new Error(`fail to get openId, code:${input.code}`)
      }
      return await bindWxOpenIdToUser(openId)
    }),

  sendSubscribeNotify: protectedProcedure
    .input(SubscribeNotifySchema)
    .mutation(async ({ ctx, input }) => {
      return await sendSubscribeNotify(
        input.openId,
        input.accessToken,
        input.notifyData,
      )
    }),

  getWxGeneralAccessToken: protectedProcedure.query(async ({ ctx, input }) => {
    return singletonTokenInstance.getGeneralAccessToken()
  }),

  getWxJsApiToken: protectedProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ ctx, input }) => {
      return sign(input.url)
    }),
})
