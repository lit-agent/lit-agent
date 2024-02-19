import { IWechatProfile, IWechatRefreshedToken } from "@/lib/wechat/auth/schema"
import {
  getWechatUserProfile,
  getWechatAuthToken,
  refreshWechatAuthToken,
} from "@/lib/wechat/auth/funcs/server"
import {
  getWechatJsapiTicket,
  getWechatJssdkSignature,
  getWechatSDKToken,
  IWechatSDKToken,
} from "@/lib/wechat/notify/functions"

/**
 * 用于稳定地获取用户信息
 */
export class WechatAuth {
  private code: string
  private token?: IWechatRefreshedToken

  constructor(code: string) {
    this.code = code
  }

  public async getUserInfo(): Promise<IWechatProfile> {
    if (!this.token)
      // init token
      this.token = await getWechatAuthToken(this.code)

    try {
      return getWechatUserProfile(this.token.access_token, this.token.openid)
    } catch (e) {
      // refresh token
      this.token = await refreshWechatAuthToken(this.token.refresh_token)
      return this.getUserInfo() // again since the token refreshed
    }
  }
}

export class WechatSDK {
  private token?: IWechatSDKToken
  private ticket?: {
    value: string
    time: number // seconds
    expires_in: number
  }

  private async getToken() {
    if (!this.token) this.token = await getWechatSDKToken()
    return this.token.access_token
  }

  private async _getTicket() {
    const access_token = await this.getToken()

    if (
      !this.ticket ||
      Date.now() / 1000 - this.ticket.time >= this.ticket.expires_in
    ) {
      const { ticket, expires_in } = await getWechatJsapiTicket(access_token)
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
    return getWechatJssdkSignature(ticket, url)
  }

  public async sendMessage(openid: string, template_id: string, url: string) {
    const access_token = await this.getToken()

    const targetUrl = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`

    const data = {
      toUser: openid,
      template_id,
      url,
      data: {
        thing2: { value: "test-thing2" },
        thing3: { value: "test-thing3" },
        thing4: { value: "test-thing4" },
      },
    }
    console.log("[wx-sdk] fetching: ", { targetUrl, data })

    return fetch(targetUrl, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }
}
