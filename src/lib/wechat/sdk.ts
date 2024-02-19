import { IWechatProfile, IWechatRefreshedToken } from "@/lib/wechat/auth/schema"
import {
  getJsapiTicket,
  getJssdkSignature,
  getProfile,
  getWechatToken,
  refreshWechatToken,
} from "@/lib/wechat/auth/funcs/server"

/**
 * 用于稳定地获取用户信息
 */
export class WechatSDK {
  private code: string
  private token?: IWechatRefreshedToken
  private ticket?: {
    value: string
    time: number // seconds
    expires_in: number
  }

  constructor(code: string) {
    this.code = code
  }

  public async getUserInfo(): Promise<IWechatProfile> {
    if (!this.token)
      // init token
      this.token = await getWechatToken(this.code)

    try {
      return getProfile(this.token.access_token, this.token.openid)
    } catch (e) {
      // refresh token
      this.token = await refreshWechatToken(this.token.refresh_token)
      return this.getUserInfo() // again since the token refreshed
    }
  }

  private async _getTicket() {
    if (!this.token) this.token = await getWechatToken(this.code)

    if (
      !this.ticket ||
      Date.now() / 1000 - this.ticket.time >= this.ticket.expires_in
    ) {
      const { ticket, expires_in } = await getJsapiTicket(
        this.token.access_token,
      )
      this.ticket = {
        value: ticket,
        time: Date.now() / 1000,
        expires_in,
      }
    }
    return this.ticket.value
  }

  public async getSignature(url: string) {
    const ticket = await this._getTicket()
    return getJssdkSignature(ticket, url)
  }
}
