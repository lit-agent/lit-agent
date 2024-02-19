import { isWechatError } from "@/lib/wechat/schema"
import { WECHAT_API_URL, WX_APP_ID, WX_APP_SECRET } from "@/lib/wechat/config"
import {
  IWechatAdaptedProfile,
  IWechatAdaptedToken,
  IWechatProfile,
  IWechatRefreshedToken,
  IWechatTokenPayload,
  WechatScopeType,
} from "@/lib/wechat/auth/schema"
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

/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
const fetchWechatAuth = async <T>(
  name: string,
  path: string,
  params: Record<string, string>,
) => {
  const res = await fetch(
    WECHAT_API_URL + path + "?" + new URLSearchParams(params),
  )
  const data = await res.json()
  console.log(`[wechat-auth] fetched ${name}: `, data)
  if (isWechatError(data)) throw data.errmsg
  return data as T
}

/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export const getWechatToken = async (code: string) => {
  return fetchWechatAuth<IWechatTokenPayload>(
    "get-token",
    `/sns/oauth2/access_token`,
    {
      appid: WX_APP_ID,
      secret: WX_APP_SECRET,
      code,
      grant_type: "authorization_code",
    },
  )
}

export const adaptWechatToken = (
  token: IWechatTokenPayload,
): IWechatAdaptedToken => {
  const { openid, ...other } = token
  return { id: openid, ...other }
}

export const refreshWechatToken = async (refresh_token: string) => {
  return fetchWechatAuth<IWechatRefreshedToken>(
    "refresh-token",
    `/sns/oauth2/refresh_token`,
    {
      appid: WX_APP_ID,
      grant_type: "refresh_token",
      refresh_token,
    },
  )
}

export const getWechatProfile = async (
  access_token: string,
  openid: string,
) => {
  return fetchWechatAuth<IWechatProfile>("get-profile", `/sns/userinfo`, {
    access_token,
    openid,
    lang: "zh_CN",
  })
}

export const adaptWechatProfile = (
  profile: IWechatProfile,
): IWechatAdaptedProfile => ({
  ...profile,
  sub: profile.openid,
  name: profile.nickname,
  image: profile.headimgurl,
})

/**
 * 用于稳定地获取用户信息
 */
export class WxServerAuth {
  private code: string
  private token?: IWechatRefreshedToken

  constructor(code: string) {
    this.code = code
  }

  public async getUserInfo(): Promise<IWechatProfile> {
    if (!this.token) {
      // init token
      this.token = await getWechatToken(this.code)
      return this.getUserInfo() // again since the token not initialized
    }

    try {
      return getWechatProfile(this.token.access_token, this.token.openid)
    } catch (e) {
      // refresh token
      this.token = await refreshWechatToken(this.token.refresh_token)
      return this.getUserInfo() // again since the token refreshed
    }
  }
}
