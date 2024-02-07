import * as tencentcloud from "tencentcloud-sdk-nodejs-sms"
import * as process from "process"
import { prisma } from "@/server/db"

import { SMS_EXPIRE_MINUTES } from "@/const"
import { admins } from "@/config"

const SmsClient = tencentcloud.sms.v20210111.Client

const secretId = process.env.TENCENTCLOUD_SECRET_ID
const secretKey = process.env.TENCENTCLOUD_SECRET_KEY

// 实例化要请求产品(以cvm为例)的client对象
const client = new SmsClient({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId,
    secretKey,
  },
  // 产品地域
  region: "ap-beijing",
  // 可选配置实例
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
      headers: {
        // 自定义 header
      },
      // proxy: "http://127.0.0.1:8899" // http请求代理
    },
  },
})

export const sendSms = async ({ phone }: { phone: string }) => {
  const code = Math.random().toString().slice(2, 8)

  const params = {
    PhoneNumberSet: [phone],
    SmsSdkAppId: "1400518792",
    SignName: "邢健的个人博客",
    TemplateId: "2064119",
    TemplateParamSet: [code, `${SMS_EXPIRE_MINUTES}`],
  }

  console.log("[sms] sending: ", { phone, code })
  const res = await client.SendSms(params)
  console.log("[sms] response: ", res)

  const admin = Object.values(admins).find((admin) => admin.phone === phone)

  return await prisma.account.upsert({
    where: {
      provider_providerAccountId: { provider: "sms", providerAccountId: phone },
    },
    create: {
      provider: "sms",
      providerAccountId: phone,
      type: "credentials",
      access_token: code,
      user: {
        connectOrCreate: {
          where: { phone },
          create: admin ?? { phone },
        },
      },
    },
    update: { access_token: code },
  })
}

export const validateSms = async ({
  phone,
  code,
}: {
  phone: string
  code: string
}) => {
  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "sms",
        providerAccountId: phone,
      },
    },
    include: {
      user: true,
    },
  })
  console.log("[sms] validating account: ", account)

  if (
    // 不存在
    !account ||
    // todo: 过期
    // getTimeS() > account.expires_at! ||
    // 错误
    account.access_token !== code
  ) {
    return null
  }

  return account.user
}
