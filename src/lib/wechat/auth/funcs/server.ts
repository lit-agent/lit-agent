import { isWechatError } from "@/lib/wechat/schema"
import { WECHAT_API_URL, WX_APP_ID, WX_APP_SECRET } from "@/lib/wechat/config"
import {
  IWechatAdaptedToken,
  IWechatProfile,
  IWechatRefreshedToken,
  IWechatToken,
} from "@/lib/wechat/auth/schema"
import { LOG_AUTH_ENABLED } from "@/lib/auth/config"

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
  if (LOG_AUTH_ENABLED) console.log(`[wechat-auth] fetched ${name}: `, data)
  if (isWechatError(data)) throw data.errmsg
  return data as T
}

/**
 * 这个函数是 unsafe 的，一旦出错，说明要重新从前端拿 code 了
 * @param code
 */
export const getWechatToken = async (code: string) => {
  return fetchWechatAuth<IWechatToken>(
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

export const adaptWechatToken = (token: IWechatToken): IWechatAdaptedToken => {
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
