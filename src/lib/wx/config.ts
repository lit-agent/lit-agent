/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

export const WECHAT_AUTHORIZATION_DOC_URL =
  "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html"

import { env } from "@/env"
import { ISubscribeNotifyTemplate, IWxApp } from "./schema"

export const WX_APP_ID = env.NEXT_PUBLIC_WX_APP_ID
export const WX_PROVIDER_ID = "wechat"

// 微信强制绝对地址
export const WX_REDIRECT_URL = env.NEXT_PUBLIC_APP_URL + "/wx-auth"
console.log({ WX_REDIRECT_URL })

export const WX_API_URL = "https://api.weixin.qq.com"
export const WX_BIN_URL = WX_API_URL + "/cgi-bin"
export const WX_SNS_URL = WX_API_URL + "/sns"
export const WX_USER_INFO_URL = WX_SNS_URL + "/userinfo"
export const WX_OAUTH_URL = WX_SNS_URL + "/oauth2"

// access token 用于 auth 的各个环节
export const WX_ACCESS_TOKEN_URL = WX_OAUTH_URL + "/access_token"
// refresh token 用于 刷新 access token
export const WX_REFRESH_ACCESS_TOKEN_URL = WX_OAUTH_URL + "/refresh_token"

export const WX_AUTH_URL = WX_OAUTH_URL + "/authorize"
// 基本鉴权，获取推送订阅消息的access token的接口
export const WX_REGULAR_ACCESS_TOKEN_URL = WX_BIN_URL + "/token"
export const WX_NOTIFY_API_URL = WX_BIN_URL + "/message/subscribe/bizsend"

// note: app_id 是要暴露给前端的，但是secret不行，所以这里要分别导出
export const wxApp: IWxApp = {
  appId: env.NEXT_PUBLIC_WX_APP_ID,
  appSecret: env.WX_APP_SECRET,
}

export const commentNotify: ISubscribeNotifyTemplate = {
  // 订阅通知模版ID
  template_id: "3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0",
  // 点击卡片后跳转的页面
  page: WX_REDIRECT_URL,
  // 卡片数据
  data: new Map([
    // 留言用户
    ["thing2", ""],
    // 留言内容
    ["thing3", ""],
    // 留言时间
    ["date4", ""],
  ]),
}
