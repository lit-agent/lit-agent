import { createTRPCRouter, publicProcedure } from "../trpc"
import { z } from "zod"
import { sendSms, validateSms } from "@/server/sms"

export const smsRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input }) => {
      return await sendSms(input)
    }),

  validate: publicProcedure
    .input(
      z.object({ phone: z.string(), code: z.string(), bloggerId: z.string() }),
    )
    .mutation(async ({ input }) => {
      return await validateSms(input)
    }),
})
