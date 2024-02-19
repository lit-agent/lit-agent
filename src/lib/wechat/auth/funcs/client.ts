import { WechatScopeType } from "@/lib/wechat/auth/schema"
import { WX_APP_ID } from "@/lib/wechat/config"
import { WECHAT_AUTH_CALLBACK_URL } from "@/lib/wechat/auth/config"

/**
 * 只有该函数可以在客户端调用，用于拉起用户微信授权弹窗
 */
export const getWechatAuthorizationUrl = (
  scope: WechatScopeType = WechatScopeType.info,
  userId?: string,
  forcePopup: boolean = true,
) => {
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${WX_APP_ID}&redirect_uri=${encodeURIComponent(WECHAT_AUTH_CALLBACK_URL)}&response_type=code&scope=${scope}&state=${userId}&forcePopup=${forcePopup}#wechat_redirect`
  // console.log("[wechat-auth] get-authorization-url: ", url)
  return url
}
