"use server"
import { nanoid } from "nanoid"
import { RETURN_URL, terminal } from "@/lib/pay/config"
import { fetchShouqianba } from "@/lib/pay/utils"
import {
  JumpPayRequest,
  PaymentOtherStatus,
  PayOrderFinalStatus,
} from "@/lib/pay/schema"
import { genPayUrlAction, queryAction } from "@/lib/pay/business"
import { UnexpectedError } from "@/config"
import { pusherServer } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"

// server-side HMR, ref: https://chat.openai.com/c/8491eba2-9f95-4926-9b20-f6ffaa9e6915
if (!global.data) {
  global.data = {
    intervals: {},
  }
}
const persistedData = global.data

export async function cancelJob(id: string) {
  console.log(
    `cancelled job(id=${id}), current intervals: `,
    Object.keys(persistedData.intervals),
  )
  if (id in persistedData.intervals) {
    clearInterval(persistedData.intervals[id])
    delete persistedData.intervals[id]
  }
  return
}

/**
 * C扫B场景 ✅
 * 需要生成一个二维码，然后手机微信扫码支付
 */
export async function createInvoiceAction({
  subject = "Redeem",
  total_amount,
  userId,
}: {
  total_amount: number
  subject?: string
  userId: string
}) {
  const id = nanoid()

  const params: JumpPayRequest = {
    client_sn: id,
    total_amount: total_amount.toString(),
    // payway: "3"
    subject,
    operator: userId,
    return_url: RETURN_URL,
  }

  const url = genPayUrlAction(params)
  const startTime = Date.now()
  console.log("-- res: ", { id, url, startTime })

  const f = async () => {
    const t = (Date.now() - startTime) / 1e3
    // 6分钟后关闭轮询
    if (t > 360)
      return pusherServer.trigger(id, SocketEventType.Payment, {
        order_status: PaymentOtherStatus.TIMEOUT,
      })

    const t2 = Math.log(t + 1)
    const delay = t2 * 1e3

    try {
      const { data } = await queryAction(id)
      console.log(`[sqb] (${t.toFixed(2)}:${t2.toFixed(2)}s) queried: `, data)

      // 订单号不存在（还没开始创建）
      if (!data) return setTimeout(f, delay)

      const status = data.order_status

      // 推给前端
      await pusherServer.trigger(id, SocketEventType.Payment, data)

      switch (status) {
        // 订单已创建，但还在等待
        case PaymentOtherStatus.CREATED:
          return setTimeout(f, delay)

        // 其他状态，基本都是终态
        case PayOrderFinalStatus.CANCELED:
        case PayOrderFinalStatus.REFUNDED:
        case PayOrderFinalStatus.PAY_CANCELED:
        case PayOrderFinalStatus.PARTIAL_REFUNDED:
          return

        case PayOrderFinalStatus.PAID:
          return

        default:
          throw new UnexpectedError()
      }
    } catch (e) {
      console.log("[sqb] query error: ", e)
    }
  }
  setTimeout(f, 0)

  return { id, url }
}

/**
 * 预付单模式 ❌
 * 「显示商户微信收款开通中」
 *
 * ref:
 * 1. doc: 《收钱吧移动支付API对接最佳实践(手机浏览器H5).V1.6.6.pdf》
 * 2. web: https://doc.shouqianba.com/zh-cn/api/interface/precreate.html
 */
export async function createPrepayAction({
  total_amount,
  userId,
  subject = "Redeem",
}: {
  total_amount: number
  subject?: string
  userId: string
}) {
  const path = "/upay/v2/precreate"
  const id = nanoid()

  const params = {
    terminal_sn: terminal.terminal_sn,
    client_sn: id,
    total_amount: total_amount.toString(),
    payway: "3", // 微信
    sub_payway: "6", //网页必填
    subject: subject,
    operator: userId,
    payer_uid: userId,
    extended: {
      return_url: RETURN_URL,
      spbill_create_ip: "0.0.0.0", // todo: get ip from code
    },
  }

  return fetchShouqianba({ role: terminal, params, path })
}
