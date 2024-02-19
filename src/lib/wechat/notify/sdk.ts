import wx from "weixin-js-sdk"
import { WECHAT_APP_ID } from "@/lib/wechat/config"
import { WECHAT_NONCE_STR, WECHAT_TIMESTAMP } from "@/lib/wechat/notify/config"

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
