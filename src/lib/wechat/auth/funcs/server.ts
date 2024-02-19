import { isWechatError } from "@/lib/wechat/schema"
import {
  WECHAT_API_URL,
  WECHAT_APP_ID,
  WX_APP_SECRET,
} from "@/lib/wechat/config"
import {
  IWechatAdaptedToken,
  IWechatProfile,
  IWechatRefreshedToken,
  IWechatToken,
} from "@/lib/wechat/auth/schema"
import { LOG_AUTH_ENABLED } from "@/lib/auth/config"
import { WECHAT_NONCE_STR, WECHAT_TIMESTAMP } from "@/lib/wechat/notify/config"
import { sha1 } from "js-sha1"

/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
const fetchWechatApi = async <T>(
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
  return fetchWechatApi<IWechatToken>("get-token", `/sns/oauth2/access_token`, {
    appid: WECHAT_APP_ID,
    secret: WX_APP_SECRET,
    code,
    grant_type: "authorization_code",
  })
}

export const adaptWechatToken = (token: IWechatToken): IWechatAdaptedToken => {
  const { openid, ...other } = token
  return { id: openid, ...other }
}

export const refreshWechatToken = async (refresh_token: string) => {
  return fetchWechatApi<IWechatRefreshedToken>(
    "refresh-token",
    `/sns/oauth2/refresh_token`,
    {
      appid: WECHAT_APP_ID,
      grant_type: "refresh_token",
      refresh_token,
    },
  )
}

export const getProfile = async (access_token: string, openid: string) => {
  return fetchWechatApi<IWechatProfile>("get-profile", `/sns/userinfo`, {
    access_token,
    openid,
    lang: "zh_CN",
  })
}

export const getJsapiTicket = async (access_token: string) => {
  return fetchWechatApi<{
    ticket: string
    expires_in: number
    errcode: number
    errmsg: string
  }>("get-jsapi-ticket", "/cgi-bin/ticket/getticket", {
    access_token,
    type: "jsapi",
  })
}

export const getJssdkSignature = async (ticket: string, url: string) => {
  const params = {
    noncestr: WECHAT_NONCE_STR,
    jsapi_ticket: ticket,
    timestamp: WECHAT_TIMESTAMP,
    url,
  }
  const str = Object.keys(params)
    .toSorted()
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  const signature = sha1(str)
  console.log("[wx] getSignature: ", { str, signature })
  return signature
}
