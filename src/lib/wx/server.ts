"use server"

import { env } from "@/env"
import {
  WX_ACCESS_TOKEN_URL,
  WX_APP_ID,
  WX_REFRESH_ACCESS_TOKEN_URL,
  WX_USER_INFO_URL,
} from "@/lib/wechat/config"

export type IGetWechatAccessTokenRes = {
  access_token: string
  expires_in: number // 7200s
  refresh_token: string
  openid: string
  scope: string
  is_snapshotuser: number
  unionid: string
}

export const getWechatAccessToken = async (
  code: string,
): Promise<IGetWechatAccessTokenRes> => {
  const res = await fetch(
    WX_ACCESS_TOKEN_URL +
      `?appid=${WX_APP_ID}&secret=${env.WX_APP_SECRET}&code=${code}&grant_type=authorization_code`,
  )
  const data = await res.json()
  console.log("[wechat] getWechatAccessToken: ", data)
  return data
}

export interface IRefreshWechatAccessTokenRes {
  access_token: string
  expires_in: number //7200s
  refresh_token: string
  openid: string
  scope: string
}

export const refreshWechatAccessToken = async (
  refresh_token: string,
): Promise<IRefreshWechatAccessTokenRes> => {
  const res = await fetch(
    WX_REFRESH_ACCESS_TOKEN_URL +
      `?appid=${WX_APP_ID}&grant_type=refresh_token&refresh_token=${refresh_token}`,
  )
  const data = await res.json()
  console.log("[wechat] refreshWechatAccessToken: ", data)
  return data
}

export interface IGetWechatUserInfoRes {
  // 用户的唯一标识
  openid: string
  // 只有在用户将公众号绑定到微信开放平台账号后，才会出现该字段。
  unionid: string
  nickname: string
  // 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
  headimgurl: string

  sex: number
  province: string
  city: string
  country: string
  privilege: string[]
}

export const getWechatUserInfo = async (
  access_token: string,
  openid: string,
): Promise<IGetWechatUserInfoRes> => {
  const res = await fetch(
    WX_USER_INFO_URL +
      `?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
  )
  const data = await res.json()
  console.log("[wechat] getWechatUserInfo: ", data)
  return data
}
