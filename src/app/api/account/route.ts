"use server";

import { env } from "@/env";
import * as tencentcloud from "tencentcloud-sdk-nodejs-sms";

const SmsClient = tencentcloud.sms.v20210111.Client;

// 实例化要请求产品(以cvm为例)的client对象
const client = new SmsClient({
  // 为了保护密钥安全，建议将密钥设置在环境变量中或者配置文件中，请参考本文凭证管理章节。
  // 硬编码密钥到代码中有可能随代码泄露而暴露，有安全隐患，并不推荐。
  credential: {
    secretId: env.TENCENTCLOUD_SECRET_ID,
    secretKey: env.TENCENTCLOUD_SECRET_KEY,
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
});

export const smsAction = async ({ phone }) => {
  const code = Math.random().toString().slice(2, 8);

  const params = {
    PhoneNumberSet: [phone],
    SmsSdkAppId: "1400518792",
    SignName: "邢健的个人博客",
    TemplateId: "2064119",
    TemplateParamSet: [code, "10"],
  };

  try {
    const res = client.SendSms(params);
    console.log("-- res: ", res);
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
};
