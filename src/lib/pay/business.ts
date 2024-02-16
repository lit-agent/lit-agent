"use server"

import { env } from "@/env"
import { md5 } from "@/lib/utils"
import { fetchShouqianba } from "@/lib/pay/utils"
import { terminal, vendor } from "@/lib/pay/config"
import { ITerminal, JumpPayRequest, PayQueryRes } from "@/lib/pay/schema"

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
    .map(
      (k) =>
        `${k}=${
          // encodeURIComponent(
          params[k]
          // )
        }`,
    )
    .join("&")

  // 添加key
  const toSign = `${sortedParamStr}&key=${terminal.terminal_key}`

  // MD5 加密并转大写
  const signed = md5(toSign).toUpperCase()
  const wholeParams = sortedParamStr + "&sign=" + signed
  const url = env.NEXT_PUBLIC_PAY_QR_DOMAIN + "?" + wholeParams

  console.log("-- req: ", { url, params, toSign, signed })
  return url
}

/**
 * 收钱吧激活
 * @param deviceId 同一个app_id下唯一的设备id
 * @param code 激活码
 * @returns
 */
export const activateAction = async (deviceId: string, code: string) => {
  const path = `/terminal/activate`
  const params = {
    app_id: env.PAY_APP_ID,
    code: code,
    device_id: deviceId,
  }
  console.log("-- activating: ", { deviceId, code, params, vendor })
  const res = await fetchShouqianba({ params, role: vendor, path })
  const data = res.biz_response as ITerminal
  console.log("[sqb] activated: ", data)
  return data
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
  return data.biz_response as PayQueryRes
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
