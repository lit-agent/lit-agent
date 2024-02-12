"use server"

import { PayRequest } from "@/lib/pay/models/pay-request"
import { Terminal } from "@/lib/pay/models/terminal"
import { generatePayUrl, getSign } from "@/lib/pay/pay"
import { Poller } from "@/lib/pay/pay-result-query-poller"
import { nanoid } from "nanoid"
import { env } from "@/env"
import { v4 } from "uuid"

const RETURN_URL = "https://lit.cs-magic.cn"

/**
 * C扫B场景 ✅
 * 需要生成一个二维码，然后手机微信扫码支付
 */
export async function createInvoiceAction() {
  const orderCode = nanoid()
  const terminalSn = env.PAY_TERMINAL_SN
  const terminalKey = env.PAY_TERMINAL_KEY

  const request = new PayRequest(
    orderCode,
    "1",
    "ProductTest01",
    "cyx",
    RETURN_URL,
  )
  const terminal = new Terminal(terminalSn, terminalKey)

  const payUrl = generatePayUrl(request, terminal)
  console.log("[pay] generated pay url: ", payUrl)

  // 调用支付接口
  fetch(payUrl, {
    redirect: "follow",
  })
    .then((data) => {
      const poller = new Poller(terminalSn, terminalKey, orderCode)
      poller.start()
    })
    .catch((error) => {
      console.error("调用支付接口时发生错误", error)
    })
    .finally(() => {
      console.log("[pay] finished")
    })

  return payUrl
}

/**
 * 预付单模式 ❌
 * 「显示商户微信收款开通中」
 *
 * ref:
 * 1. doc: 《收钱吧移动支付API对接最佳实践(手机浏览器H5).V1.6.6.pdf》
 * 2. web: https://doc.shouqianba.com/zh-cn/api/interface/precreate.html
 */
export async function createPrepayAction() {
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/upay/v2/precreate`
  const reqData = {
    terminal_sn: env.PAY_TERMINAL_SN,
    client_sn: nanoid(),
    total_amount: "10",
    payway: "3", // 微信
    sub_payway: "6", //网页必填
    subject: "test",
    operator: "markshawn",
    payer_uid: v4(),
    extended: {
      return_url: RETURN_URL,
      spbill_create_ip: "0.0.0.0", // todo: get ip from code
    },
  }
  const body = JSON.stringify(reqData)
  const sign = getSign(body + env.PAY_TERMINAL_KEY)
  const Authorization = [env.PAY_TERMINAL_SN, sign].join(" ")
  console.log("-- req: ", { url, reqData, Authorization })

  const res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  })
  const resData = await res.json()
  console.log("-- res: ", resData)
  return resData
}
