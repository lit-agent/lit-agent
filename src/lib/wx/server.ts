import { getWxAccessToken } from "@/lib/wx/functions/get-access-token"
import { refreshWxAccessToken } from "@/lib/wx/functions/refresh-access-token"
import {
  getWxUserInfo,
  IGetWxUserInfoRes,
} from "@/lib/wx/functions/get-user-info"

import { isWxError } from "@/lib/wx/functions/_general"

export class WxServerAuth {
  private code: string
  private access_token?: string
  private refresh_token?: string
  private openid?: string
  private expires_in?: number // we can ignore it for ease

  constructor(code: string) {
    this.code = code
  }

  private async getUserSecrets() {
    const data = await getWxAccessToken(this.code)
    if (isWxError(data)) throw new Error(data.errmsg)

    this.access_token = data.access_token
    this.refresh_token = data.refresh_token
    this.openid = data.openid
    this.expires_in = data.expires_in
    return data
  }

  public async getUserInfo(): Promise<IGetWxUserInfoRes> {
    if (!this.access_token || !this.openid || !this.refresh_token) {
      await this.getUserSecrets()
      return this.getUserInfo() // again since the token not initialized
    }

    const userInfo = await getWxUserInfo(this.access_token, this.openid)
    if (!isWxError(userInfo)) return userInfo

    // 可能是 access_token 过期了
    const refreshedWxAccessToken = await refreshWxAccessToken(
      this.refresh_token,
    )

    // 需要重新登陆了，30天
    if (isWxError(refreshedWxAccessToken))
      throw new Error(refreshedWxAccessToken.errmsg)

    const { access_token, refresh_token, expires_in, openid } =
      refreshedWxAccessToken
    this.access_token = access_token
    this.refresh_token = refresh_token
    this.expires_in = expires_in
    this.openid = openid

    return this.getUserInfo() // again since the token refreshed
  }
}
