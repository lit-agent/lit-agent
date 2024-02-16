/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

export const WECHAT_AUTHORIZATION_DOC_URL =
  "https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html"

import { env } from "@/env"
import { ISubscribeNotifyTemplate, IWxApp } from "./schema"

export const WX_APP_ID = env.NEXT_PUBLIC_WX_APP_ID
export const WX_APP_SECRET = env.WX_APP_SECRET
export const WX_PROVIDER_ID = "wechat"

// 微信强制绝对地址
export const WX_REDIRECT_URL = env.NEXT_PUBLIC_APP_URL + "/wx-auth"
console.log("[wx]: ", { WX_REDIRECT_URL })

export const WX_API_URL = "https://api.weixin.qq.com"
export const WX_GET_CODE_URL =
  "https://open.weixin.qq.com/connect/oauth2/authorize"

export const WX_GET_ACCESS_TOKEN_URL = WX_API_URL + "/sns/oauth2/access_token"
export const WX_REFRESH_ACCESS_TOKEN_URL =
  WX_API_URL + "/sns/oauth2/refresh_token"
export const WX_GET_USER_INFO_URL = WX_API_URL + "/sns/userinfo"
export const WX_VALIDATE_ACCESS_TOKEN_URL = WX_API_URL + "/sns/auth"

// 基本鉴权，获取推送订阅消息的access token的接口
export const WX_REGULAR_ACCESS_TOKEN_URL = WX_API_URL + "/cgi-bin/token"
export const WX_NOTIFY_API_URL =
  WX_API_URL + "/cgi-bin/message/subscribe/bizsend"

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
