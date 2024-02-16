import { WX_USER_INFO_URL } from "@/lib/wx/config"
import { WxRes } from "@/lib/wx/server"

export interface IGetWxUserInfoRes {
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

export const getWxUserInfo = async (
  access_token: string,
  openid: string,
): Promise<WxRes<IGetWxUserInfoRes>> => {
  const res = await fetch(
    WX_USER_INFO_URL +
      `?access_token=${access_token}&openid=${openid}&lang=zh_CN`,
  )
  const data = await res.json()
  console.log("[wx] getWechatUserInfo: ", data)
  return data
}