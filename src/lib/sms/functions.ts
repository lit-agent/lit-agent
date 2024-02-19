"use server"

import {
  SMS_APP_ID,
  SMS_EXPIRE_MINUTES,
  SMS_PROVIDER_ID,
  SMS_SIGN_NAME,
  SMS_TEMPLATE_ID,
} from "@/lib/sms/config"
import { smsClient } from "@/lib/sms/client"
import { prisma } from "@/lib/db"
import { User } from ".prisma/client"

/**
 * 1. 用户非登录态
 * 发送验证码，更新/创建 account 表，若没有 user 则同时创建user
 *
 * 2. 用户登录态
 * 若用户绑定的手机已经激活，且phone不匹配，则拒绝
 * 否则发送验证码，更新/创建 account 表，并绑定user
 */
export const sendSms = async (phone: string, userId?: string) => {
  let userInDB: User | null = null
  if (userId) {
    userInDB = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
    })
    if (userInDB.phoneVerified && userInDB.phone !== phone)
      throw new Error("绑定的手机号不匹配")
  }

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
    if (!userInDB) userInDB = await prisma.user.create({ data: { phone } })
    userInDB = await prisma.user.update({
      where: { id: userInDB!.id }, // phone 可能不存在
      data: { phone },
    })

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
        userId: userInDB.id, // link new/old
      },
      update: { access_token: code },
    })
  }
  return { success, message }
}
