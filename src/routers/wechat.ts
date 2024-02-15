import {
    createTRPCRouter,
    protectedProcedure,
  } from "@/lib/trpc/trpc"
import { bindWxOpenIdToUser, getOpenId, getWxAuthUrl, getWxAccessToken } from "@/lib/wx/wx-auth"
import { sendSubscribeNotify } from "@/lib/wx/wx-notify"
import { SubscribeNotifySchema, ISubscribeNotifyTemplate } from "@/lib/wx/schema"
import { z } from "zod"

export const wechatRouter = createTRPCRouter({

    getWxAuthUrl: protectedProcedure
    .query(async ({ ctx, input }) => {
        return await getWxAuthUrl();
    }),

    bindWxOpenIdToUser: protectedProcedure
    .input(z.object({  code: z.string() }))
    .mutation(async ({ ctx, input}) => {
        const openId = await getOpenId(input.code);
        if (!openId) {
            throw new Error(`fail to get openId, code:${input.code}`);
        }
        return await bindWxOpenIdToUser(openId);
    }),

    sendSubscribeNotify: protectedProcedure
    .input(SubscribeNotifySchema)
    .mutation(async ({ ctx, input}) => {
        return await sendSubscribeNotify(input.openId, input.accessToken, input.notifyData);
    }),

    getWxAccessToken: protectedProcedure
    .query(async ({ ctx, input}) => {
        return await getWxAccessToken();
    }),

})