import { WX_APP_ID, WX_REFRESH_ACCESS_TOKEN_URL } from "@/lib/wx/config"
import { WxRes } from "@/lib/wx/server"

export interface IRefreshWxAccessTokenRes {
  access_token: string
  expires_in: number //7200s
  refresh_token: string
  openid: string
  scope: string
}

export const refreshWxAccessToken = async (
  refresh_token: string,
): Promise<WxRes<IRefreshWxAccessTokenRes>> => {
  const res = await fetch(
    WX_REFRESH_ACCESS_TOKEN_URL +
      `?appid=${WX_APP_ID}&grant_type=refresh_token&refresh_token=${refresh_token}`,
  )
  const data = await res.json()
  console.log("[wx] refreshWechatAccessToken: ", data)
  return data
}