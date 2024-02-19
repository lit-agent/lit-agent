import { SMS_PROVIDER_ID } from "@/lib/sms/config"
import CredentialsProvider from "next-auth/providers/credentials"
import { LOG_AUTH_ENABLED } from "@/lib/auth/config"
import { validateSms } from "@/lib/sms/functions"

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

    return validateSms(phone, code)
  },
})
