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
import { LOG_AUTH_ENABLED } from "@/lib/auth/config"

/**
 * 1. 用户非登录态
 * 发送验证码，更新/创建 account 表，若没有 user 则同时创建user
 *
 * 2. 用户登录态
 * 若用户绑定的手机已经激活，且phone不匹配，则拒绝
 * 否则发送验证码，更新/创建 account 表，并绑定user
 */
export const sendSms = async (phone: string, userId?: string) => {
  const userInDB = await prisma.user.findUnique({ where: { id: userId ?? "" } })
  const phoneInDB = await prisma.user.findUnique({ where: { phone } })
  if (userInDB?.phoneVerified && userInDB?.phone !== phone)
    throw new Error("绑定的手机号不匹配")
  // userInDB 可以抢夺phoneInDB
  const user =
    userInDB ?? phoneInDB ?? (await prisma.user.create({ data: { phone } }))

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
    await prisma.user.update({
      where: { id: user.id }, // phone 可能不存在
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
        userId: user.id, // link new/old
      },
      update: { access_token: code },
    })
  }
  return { success, message }
}

/**
 * 更新 user 端的 verfied 参数统一在 signin callback 里写
 *
 * @param phone
 * @param code
 */
export const validateSms = async (phone: string, code: string) => {
  // 在发送验证码的时候，手机号与验证码等信息已经入表，此时只要验证账号是否存在即可
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: SMS_PROVIDER_ID,
        providerAccountId: phone,
      },
      access_token: code,
    },
    include: {
      user: true,
    },
  })

  if (LOG_AUTH_ENABLED) console.log("[sms] account: ", account)

  if (!account) throw new Error("账号不存在或者验证码不对")

  // 更新验证日期
  await prisma.user.update({
    where: { id: account.user.id },
    data: { phone, phoneVerified: new Date() },
  })

  return account.user
}
