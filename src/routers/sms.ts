import { createTRPCRouter, publicProcedure } from "@/lib/trpc/trpc"
import { z } from "zod"
import {
  SMS_APP_ID,
  SMS_EXPIRE_MINUTES,
  SMS_PROVIDER_ID,
  SMS_SIGN_NAME,
  SMS_TEMPLATE_ID,
  smsClient,
} from "@/lib/sms"
import { prisma } from "@/lib/db"
import { admins } from "@/config"

export const smsRouter = createTRPCRouter({
  send: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input }) => {
      const { phone } = input
      const code = Math.random().toString().slice(2, 8)

      const params = {
        PhoneNumberSet: [phone],
        SmsSdkAppId: SMS_APP_ID,
        SignName: SMS_SIGN_NAME,
        TemplateId: SMS_TEMPLATE_ID,
        TemplateParamSet: [code, `${SMS_EXPIRE_MINUTES}`],
      }

      console.log("[sms] sending: ", { phone, code })
      const res = await smsClient.SendSms(params)
      console.log("[sms] response: ", res)

      const message = res?.SendStatusSet![0]!.Code
      const success = message === "Ok"

      if (success) {
        const adminUser = Object.values(admins).find(
          (user) => user.phone === phone,
        )
        let adminData
        if (adminUser) {
          const { honors, rooms, ...otherData } = adminUser
          adminData = otherData
        }

        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: SMS_PROVIDER_ID,
              providerAccountId: phone,
            },
          },
          create: {
            provider: SMS_PROVIDER_ID,
            providerAccountId: phone,
            type: "credentials",
            access_token: code,
            user: {
              connectOrCreate: {
                where: { phone },
                create: adminData ?? { phone },
              },
            },
          },
          update: { access_token: code },
        })
      }
      return { success, message }
    }),
})
