import wx from "weixin-js-sdk"
import { WECHAT_APP_ID } from "@/lib/wechat/config"

export const WECHAT_TIMESTAMP = Math.floor(Date.now() / 1e3)
export const WECHAT_NONCE_STR = "sb"

wx.config({
  debug: true,
  appId: WECHAT_APP_ID,
  timestamp: WECHAT_TIMESTAMP,
  nonceStr: WECHAT_NONCE_STR,
  signature: "",
  jsApiList: [],
})

wx.ready(() => {
  console.log("[wx] ready...")
})
wx.error((res) => {
  console.error("[wx] error: ", res)
})
