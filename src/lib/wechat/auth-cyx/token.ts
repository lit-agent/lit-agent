// 获取微信token单例类
import {
  WECHAT_API_URL,
  WECHAT_APP_ID,
  WECHAT_APP_SECRET,
} from "@/lib/wechat/config"

import { GetAccessTokenResponse } from "@/lib/wechat/auth-cyx/schema"

export class SingletonToken {
  static instance

  static accessToken: string
  static accessTokenLastUpdated: number

  static jsapiTicket: string
  static jsapiTicketLastUpdated: number

  constructor() {
    if (!SingletonToken.instance) {
      SingletonToken.instance = this
    }
    return SingletonToken.instance
  }

  // 获取微信通用Access Token
  async getGeneralAccessToken() {
    if (
      !SingletonToken.accessToken ||
      !this.isTokenValid(SingletonToken.accessTokenLastUpdated)
    ) {
      this.getWxAccessToken()
        .then((response) => {
          if (response.access_token) {
            SingletonToken.accessToken = response.access_token
            SingletonToken.accessTokenLastUpdated = Date.now()
            console.log(
              `--getGeneralToken success, response:${JSON.stringify(response)}`,
            )
          } else {
            console.error(
              `--getGeneralToken failed, response:${JSON.stringify(response)}`,
            )
            throw new Error("getGeneralToken failed")
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
    return SingletonToken.accessToken
  }

  // 获取调用wx-js-api鉴权用JsapiTicket
  async getJsapiTicket() {
    const accessToken = this.getGeneralAccessToken()
    if (accessToken) {
      if (
        !SingletonToken.jsapiTicket ||
        !this.isTokenValid(SingletonToken.jsapiTicketLastUpdated)
      ) {
        const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("network error")
            }
            return response.json()
          })
          .then((data) => {
            if (data?.ticket) {
              SingletonToken.jsapiTicket = data.ticket
              SingletonToken.jsapiTicketLastUpdated = Date.now()
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
    return SingletonToken.jsapiTicket
  }

  isTokenValid(lastUpdated) {
    return lastUpdated && Date.now() - lastUpdated < 2 * 60 * 60 * 1000
  }

  // 获取微信access token
  async getWxAccessToken() {
    const url = `${WECHAT_API_URL}/cgi-bin/token?grant_type=client_credential&appid=${WECHAT_APP_ID}&secret=${WECHAT_APP_SECRET}`
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    console.log(`getWxAccessToken: `, { url, data })
    return data as GetAccessTokenResponse
  }
}

export const singletonTokenInstance = new SingletonToken()
export default singletonTokenInstance
