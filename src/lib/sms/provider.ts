import { prisma } from "@/lib/db"
import { SMS_PROVIDER_ID } from "@/lib/sms/config"
import { userMainViewSchema } from "@/schema/user"
import CredentialsProvider from "next-auth/providers/credentials"
import { LOG_AUTH_ENABLED } from "@/lib/auth/config"

export const SmsProvider = CredentialsProvider({
  id: SMS_PROVIDER_ID,
  name: "sms",
  credentials: {
    phone: { label: "Phone Number", placeholder: "+123456789" },
    code: { label: "Verification Code", type: "text" },
  },

  /**
   * 登录的时候会调用这个函数，返回的结果会存入 jwt 回调的 user 内
   */
  authorize: async (credentials) => {
    if (LOG_AUTH_ENABLED) console.log("[Auth] authorizing: ", credentials)

    if (!credentials) throw new Error("验证信息不能为空（1）！")

    const { phone, code } = credentials
    if (!phone || !code) throw new Error("验证信息不能为空（2）！")

    // 在发送验证码的时候，手机号与验证码等信息已经入表，此时只要验证账号是否存在即可
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: SMS_PROVIDER_ID,
          providerAccountId: phone,
        },
      },
      include: {
        user: userMainViewSchema,
      },
    })

    if (LOG_AUTH_ENABLED) console.log("[sms] account: ", account)

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
  },
})
