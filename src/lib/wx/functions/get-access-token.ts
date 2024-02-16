import { WX_ACCESS_TOKEN_URL, WX_APP_ID } from "@/lib/wx/config"
import { env } from "@/env"
import { WxRes } from "@/lib/wx/server"

export type IGetWxAccessTokenRes = {
  access_token: string
  expires_in: number // 7200s
  refresh_token: string
  openid: string
  scope: string
  is_snapshotuser: number
  unionid: string
}
export const getWxAccessToken = async (
  code: string,
): Promise<WxRes<IGetWxAccessTokenRes>> => {
  const res = await fetch(
    WX_ACCESS_TOKEN_URL +
      `?appid=${WX_APP_ID}&secret=${env.WX_APP_SECRET}&code=${code}&grant_type=authorization_code`,
  )
  const data = await res.json()
  console.log("[wx] getWechatAccessToken: ", data)

  return data
}