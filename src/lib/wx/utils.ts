import { WX_APP_ID, WX_AUTH_URL, WX_REDIRECT_URL } from "@/lib/wechat/config"

export enum WechatAuthScope {
  base = "snsapi_base",
  info = "snsapi_userinfo",
}

export const getWechatLoginUrl = (scope: WechatAuthScope, userId?: string) =>
  `${WX_AUTH_URL}?appid=${WX_APP_ID}&redirect_uri=${WX_REDIRECT_URL}&response_type=code&scope=${scope}&state=${userId}&forcePopup=true#wechat_redirect`
