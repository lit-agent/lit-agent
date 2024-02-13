"use server"
import { nanoid } from "nanoid"
import { operator, RETURN_URL, terminal } from "@/lib/pay/config"
import { fetchShouqianba } from "@/lib/pay/utils"
import { JumpPayRequest } from "@/lib/pay/schema"
import { genPayUrlAction, queryAction } from "@/lib/pay/business"
import { prisma } from "@/lib/db"
import { ThreadStatus } from "@prisma/client"

const intervals: Record<string, ReturnType<typeof setInterval>> = {}

export async function cancelJob(JobId: string) {
  const id = `invoice-${JobId}`
  let thread = await prisma.thread.findUnique({
    where: { id },
  })
  if (thread && thread.status === ThreadStatus.running) {
    thread = await prisma.thread.update({
      where: { id },
      data: { status: ThreadStatus.cancelled },
    })
    const data = thread.data as { intervalId: string }
    clearInterval(data.intervalId)
  }
  console.log("[sqb] cancel job: ", thread)
  return thread
}

/**
 * C扫B场景 ✅
 * 需要生成一个二维码，然后手机微信扫码支付
 */
export async function createInvoiceAction({
  subject = "兑换火值",
  total_amount,
}: {
  total_amount: number
  subject?: string
}) {
  const id = nanoid()

  const params: JumpPayRequest = {
    client_sn: id,
    total_amount: total_amount.toString(),
    // payway: "3"
    subject,
    operator,
    return_url: RETURN_URL,
  }

  const url = genPayUrlAction(params)
  console.log("-- res: ", { id, url })

  let i = 0
  const interval = setInterval(async () => {
    try {
      ++i
      console.log("-- interval: ", {
        id,
        i,
        intervalsCount: Object.keys(intervals).length,
      })
      // const res = await queryAction(id)
    } catch (e) {
      console.log("[sqb] query error: ", e)
      clearInterval(interval)
    }
  }, 3000)

  intervals[id] = interval

  const data = {
    id: `invoice-${id}`,
    type: "invoice",
    request: { id, params, url },
  }
  console.log("-- data: ", data)
  // await prisma.thread.create({ data: { data } })

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
  subject = "兑换火值",
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
    operator: "markshawn",
    payer_uid: userId,
    extended: {
      return_url: RETURN_URL,
      spbill_create_ip: "0.0.0.0", // todo: get ip from code
    },
  }

  return fetchShouqianba({ role: terminal, params, path })
}
