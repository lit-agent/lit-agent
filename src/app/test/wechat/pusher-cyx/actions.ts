"use server"

import { WechatAuth, WechatSDK } from "@/lib/wechat/sdk"

const sdk = new WechatSDK()

export const sendMessage = sdk.sendMessage
