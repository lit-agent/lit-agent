import {
  WX_GET_ACCESS_TOKEN_URL,
  WX_APP_ID,
  WX_APP_SECRET,
} from "@/lib/wx/config"

import { WxRes } from "@/lib/wx/functions/_general"

export type IWechatTokenPayload = {
  openid: string

  access_token: string
  expires_in: number // 7200s
  refresh_token: string
  scope: string
  is_snapshotuser: number
  unionid: string
}

/**
 * prisma account create 的 时候 不能有 openid 等额外的自定义字段
 */
export type IWechatTokenPayloadAdaptor = Omit<IWechatTokenPayload, "openid"> & {
  id: string
}

export const getWxAccessToken = async (
  code: string,
): Promise<WxRes<IWechatTokenPayload>> => {
  const res = await fetch(
    WX_GET_ACCESS_TOKEN_URL +
      `?appid=${WX_APP_ID}&secret=${WX_APP_SECRET}&code=${code}&grant_type=authorization_code`,
  )

  const data = await res.json()
  console.log("[wx] getWechatAccessToken: ", data)

  return data
}
