import { fetchWechatApi } from "@/lib/wechat/functions"
import { WECHAT_NONCE_STR, WECHAT_TIMESTAMP } from "@/lib/wechat/notify/config"
import { sha1 } from "js-sha1"
import { WECHAT_APP_ID, WECHAT_APP_SECRET } from "@/lib/wechat/config"

export type IWechatSDKToken = { access_token: string; expires_in: number }

/**
 * ref: https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html
 */
export const getWechatSDKToken = async () => {
  return fetchWechatApi<IWechatSDKToken>(
    "get-wechat-sdk-token",
    "/cgi-bin/token",
    {
      grant_type: "client_credential",
      appid: WECHAT_APP_ID,
      secret: WECHAT_APP_SECRET,
    },
  )
}

export const getWechatJsapiTicket = async (access_token: string) => {
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

export const getWechatJssdkSignature = async (ticket: string, url: string) => {
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
