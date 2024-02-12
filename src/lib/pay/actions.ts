"use server"

import { env } from "@/env"
import { md5 } from "@/lib/utils"
import { fetchShouqianba } from "@/lib/pay/utils"
import { operator, RETURN_URL, terminal, vendor } from "@/lib/pay/config"
import { ITerminal, JumpPayRequest, PayQueryResponse } from "@/lib/pay/schema"
import { nanoid } from "nanoid"

/**
 * 跳转支付url生成
 * 使用场景：支付时调用该接口生产该订单唯一相关的url引导用户点击进行支付
 * @param payRequest 支付相关参数，详情见payRequest类
 * @param role
 * @returns
 */
export const genPayUrlAction = (payRequest: JumpPayRequest) => {
  const params = {
    terminal_sn: terminal.terminal_sn,
    ...payRequest,
  }
  // 排序并拼接字符串
  const sortedParamStr = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}=${encodeURIComponent(params[k])}`)
    .join("&")

  // 添加key
  const toSign = `${sortedParamStr}&key=${terminal.terminal_key}`

  // MD5 加密并转大写
  const signed = md5(toSign).toUpperCase()
  const wholeParams = sortedParamStr + "&sign=" + signed
  const url = env.NEXT_PUBLIC_PAY_QR_DOMAIN + "?" + wholeParams

  console.log("-- req: ", { params, toSign, signed, url })
  return url
}

/**
 * 收钱吧激活
 * @param deviceId 同一个app_id下唯一的设备id
 * @param code 激活码
 * @returns
 */
export const activateAction = async (deviceId: string, code: string) => {
  console.log("-- activating: ", { deviceId, code })
  const path = `/terminal/activate`
  const params = {
    app_id: env.PAY_APP_ID,
    code: code,
    device_id: deviceId,
  }
  const data = await fetchShouqianba({ params, role: vendor, path })
  return data.biz_response as ITerminal
}

/**
 * 收钱吧签到
 * @param role 终端信息，终端号和终端密钥
 * @param deviceId 同一个app_id下唯一的设备id
 * @returns
 */
export const checkinAction = async (deviceId: string) => {
  const path = "/terminal/checkin"
  const params = {
    terminal_sn: terminal.terminal_sn,
    device_id: deviceId,
  }
  const data = await fetchShouqianba({ role: terminal, path, params })
  return data.biz_response as ITerminal
}

/**
 * 收钱吧查单
 * @param role 终端信息，终端号和终端密钥
 * @param orderCode 订单号
 * @returns
 */
export const queryAction = async (orderCode: string) => {
  const path = "/upay/v2/query"
  const params = {
    terminal_sn: terminal.terminal_sn,
    client_sn: orderCode,
  }
  const data = await fetchShouqianba({ role: terminal, path, params })
  return data.biz_response as PayQueryResponse
}

/**
 * 收钱吧撤单
 * 使用场景：当终端的支付流程在进行过程中如果调用支付接口没有返回成功，为了避免交易纠纷，需要调用自动撤单接口完成冲正
 * @param role 终端信息，终端号和终端密钥
 * @param orderCode 订单号
 * @returns
 */
const cancelAction = async (orderCode: string) => {
  const path = "/upay/v2/cancel"
  const params = {
    terminal_sn: terminal.terminal_sn,
    client_sn: orderCode,
  }
  return fetchShouqianba({ role: terminal, path, params })
}

/**
 * 收钱吧退款
 * @param role 终端信息，终端号和终端密钥
 * @param originalOrderCode 原订单号
 * @param refundOrderCode 和原订单关联的退款订单号
 * @param refundAmount 退款金额
 * @param operator 操作人
 * @returns
 */
export const refundAction = async (
  originalOrderCode: string,
  refundOrderCode: string,
  refundAmount: string,
  operator: string,
): Promise<any> => {
  const path = "/upay/v2/refund"
  const params = {
    terminal_sn: terminal.terminal_sn,
    client_sn: originalOrderCode,
    refund_request_no: refundOrderCode,
    refund_amount: refundAmount,
    operator: operator,
  }
  return fetchShouqianba({ role: terminal, path, params })
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

  const request: JumpPayRequest = {
    client_sn: id,
    total_amount: total_amount.toString(),
    subject,
    operator,
    return_url: RETURN_URL,
  }

  const url = genPayUrlAction(request)
  console.log("-- res: ", { id, url })

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
