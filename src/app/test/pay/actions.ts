"use server"

import { PayRequest } from "@/lib/pay/models/pay-request"
import { Terminal } from "@/lib/pay/models/terminal"
import { generatePayUrl } from "@/lib/pay/pay"
import { Poller } from "@/lib/pay/pay-result-query-poller"
import { nanoid } from "nanoid"
import { env } from "@/env"

export async function createInvoiceAction() {
  const orderCode = nanoid()
  const terminalSn = env.PAY_TERMINAL_SN
  const terminalKey = env.PAY_TERMINAL_KEY

  const url = "https://lit.cs-magic.cn"
  const request0 = new PayRequest(orderCode, "1", "ProductTest01", "cyx", url)
  const terminal = new Terminal(terminalSn, terminalKey)
  // const { data: terminal } = await activate(
  //   "test-device-001",
  //   PAY_ACTIVATION_CODE,
  // )

  const payUrl = generatePayUrl(request0, terminal)
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
