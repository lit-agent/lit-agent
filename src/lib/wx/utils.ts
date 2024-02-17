import { WX_APP_ID, WX_GET_CODE_URL, WX_REDIRECT_URL } from "@/lib/wx/config"
import { WxAuthScopeType } from "@/lib/wx/schema"

export const getWxAuthorizationUrl = (
  scope: WxAuthScopeType,
  userId?: string,
  forcePopup: boolean = true,
) => {
  const url = `${WX_GET_CODE_URL}?appid=${WX_APP_ID}&redirect_uri=${encodeURIComponent(WX_REDIRECT_URL)}&response_type=code&scope=${scope}&state=${userId}&forcePopup=${forcePopup}#wechat_redirect`

  console.log("[wx-auth] getWxAuthorizationUrl: ", {
    scope,
    userId,
    forcePopup,
    url,
  })
  
  return url
}
