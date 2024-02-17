// 实例化要请求产品(以cvm为例)的client对象
import { env } from "@/env"
import * as tencentcloud from "tencentcloud-sdk-nodejs-sms"
import { SMS_ENDPOINT, SMS_REGION } from "@/lib/sms/config"

const SmsClient = tencentcloud.sms.v20210111.Client

const secretId = env.TENCENTCLOUD_SECRET_ID
const secretKey = env.TENCENTCLOUD_SECRET_KEY

export const smsClient = new SmsClient({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId,
    secretKey,
  },
  // 产品地域
  region: SMS_REGION,
  // 可选配置实例
  profile: {
    httpProfile: {
      endpoint: SMS_ENDPOINT,
      headers: {
        // 自定义 header
      },
      // proxy: "http://127.0.0.1:8899" // http请求代理
    },
  },
})
