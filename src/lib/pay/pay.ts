import { createHash } from "crypto"
import fetch from "node-fetch"
import { Result } from "./models/pay-response"
import { PayRequest } from "./models/pay-request"
import { PayQueryResponse } from "./models/pay-query-response"
import { Terminal } from "./models/terminal"
import { env } from "@/env"

// md5加密
export const getSign = (signStr: string): string => {
  if (!signStr || signStr.trim() === "") {
    throw new Error("sign can not be null")
  }
  const hash = createHash("md5")
  hash.update(signStr, "utf-8")
  return hash.digest("hex")
}

/**
 * 跳转支付url生成
 * 使用场景：支付时调用该接口生产该订单唯一相关的url引导用户点击进行支付
 * @param payRequest 支付相关参数，详情见payRequest类
 * @param terminal
 * @returns
 */
export const generatePayUrl = (
  payRequest: PayRequest,
  terminal: Terminal,
): string => {
  const params = {
    terminal_sn: terminal.terminalSn,
    client_sn: payRequest.orderCode,
    total_amount: payRequest.totalAmount,
    subject: payRequest.subject,
    return_url: payRequest.returnUrl,
    operator: payRequest.operator,
  }
  // 排序并拼接字符串
  const sortedParamStr = Object.keys(params)
    .sort((a, b) => a.localeCompare(b))
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  // 添加key
  const stringToSign = `${sortedParamStr}&key=${terminal.terminalKey}`
  console.log(`stringToSign:${stringToSign}`)
  // MD5 加密并转大写
  const sign = createHash("md5")
    .update(stringToSign, "utf-8")
    .digest("hex")
    .toUpperCase()
  const wholeParams = sortedParamStr + "&sign=" + sign
  const urlWithParams = env.NEXT_PUBLIC_PAY_QR_DOMAIN + "?" + wholeParams
  return urlWithParams
}

/**
 * 收钱吧激活
 * @param deviceId 同一个app_id下唯一的设备id
 * @param code 激活码
 * @returns
 */
export const activate = async (
  deviceId: string,
  code: string,
): Promise<Result<Terminal | null>> => {
  console.log("-- activating: ", { deviceId, code })
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/terminal/activate`
  const params = {
    app_id: env.PAY_APP_ID,
    code: code,
    device_id: deviceId,
  }

  try {
    const sign = getSign(JSON.stringify(params) + env.PAY_VENDOR_KEY)
    console.error(`param: ${JSON.stringify(params)}`)
    console.error(env.PAY_VENDOR_SN + " " + sign)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: env.PAY_VENDOR_SN + " " + sign,
      },
    })

    if (!response.ok) {
      console.error(`http error: ${JSON.stringify(response)}`)
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.result_code !== "200") {
      console.error(
        `Activation failed with result_code, error msg: ${JSON.stringify(responseData.error_message)}`,
      )
      throw new Error(
        `Activation failed with result_code: ${responseData.result_code}`,
      )
    }
    console.log(`terminal data: `, responseData)

    const terminalResult = responseData.biz_response
    if (!terminalResult.terminal_sn || !terminalResult.terminal_key) {
      console.error(
        `Response missing terminal_sn or terminal_key, terminal: ${JSON.stringify(terminalResult)}`,
      )
      throw new Error("Response missing terminal_sn or terminal_key")
    }
    const terminal = new Terminal(
      terminalResult.terminal_sn,
      terminalResult.terminal_key,
    )

    return new Result<Terminal>(true, terminal)
  } catch (error) {
    console.error("--shouqianba activate response error:", error)
    return new Result<null>(false, null)
  }
}

/**
 * 收钱吧签到
 * @param terminal 终端信息，终端号和终端密钥
 * @param deviceId 同一个app_id下唯一的设备id
 * @returns
 */
export const checkin = async (
  terminal: Terminal,
  deviceId: string,
): Promise<any> => {
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/terminal/checkin`
  const params = {
    terminal_sn: terminal.terminalSn,
    device_id: deviceId,
  }

  try {
    const sign = await getSign(JSON.stringify(params) + terminal.terminalKey)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: terminal.terminalSn + " " + sign,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.result_code !== "200") {
      console.log(
        `Checkin failed, error msg: ${JSON.stringify(responseData.error_message)}`,
      )
      throw new Error(
        `Checkin failed with result_code: ${responseData.result_code}`,
      )
    }

    const newTerminalResult = responseData.biz_response
    if (!newTerminalResult.terminal_sn || !newTerminalResult.terminal_key) {
      console.log(
        `Response missing terminal_sn or terminal_key, terminal: ${JSON.stringify(terminal)}`,
      )
      throw new Error("Response missing terminal_sn or terminal_key")
    }
    console.log(`new terminal data: ${JSON.stringify(newTerminalResult)}`)

    const newTerminal = new Terminal(
      newTerminalResult.terminal_sn,
      newTerminalResult.terminal_key,
    )
    return new Result<Terminal>(true, newTerminal)
  } catch (error) {
    console.error("--shouqianba checkin response error:", error)
    return new Result<null>(false, null)
  }
}

/**
 * 收钱吧查单
 * @param terminal 终端信息，终端号和终端密钥
 * @param orderCode 订单号
 * @returns
 */
export const query = async (
  terminal: Terminal,
  orderCode: string,
): Promise<any> => {
  if (terminal.terminalSn === "") {
    throw new Error("terminalSn can't be null")
  }
  if (orderCode === "") {
    throw new Error(" orderCode should not be null")
  }
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/upay/v2/query`
  const params = {
    terminal_sn: terminal.terminalSn,
    client_sn: orderCode,
  }
  try {
    const sign = await getSign(JSON.stringify(params) + terminal.terminalKey)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: terminal.terminalSn + " " + sign,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.result_code !== "200") {
      console.log(
        `Query failed, error msg: ${JSON.stringify(responseData.error_message)}`,
      )
      throw new Error(
        `Query failed with result_code: ${responseData.result_code}`,
      )
    }
    console.log(`responseData: ${JSON.stringify(responseData)}`)
    const payQueryResponse = new PayQueryResponse(responseData?.biz_response)
    return new Result(true, payQueryResponse)
  } catch (error) {
    console.error("--shouqianba query response error:", error)
    return new Result(false, null)
  }
}

/**
 * 收钱吧撤单
 * 使用场景：当终端的支付流程在进行过程中如果调用支付接口没有返回成功，为了避免交易纠纷，需要调用自动撤单接口完成冲正
 * @param terminal 终端信息，终端号和终端密钥
 * @param orderCode 订单号
 * @returns
 */
const cancel = async (terminal: Terminal, orderCode: string): Promise<any> => {
  if (terminal.terminalSn === "" || terminal.terminalKey === "") {
    throw new Error("terminalSn and terminalKey can't be null")
  }
  if (orderCode === "") {
    throw new Error("orderCode can't be null")
  }
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/upay/v2/cancel`
  const params = {
    terminal_sn: terminal.terminalSn,
    client_sn: orderCode,
  }
  try {
    const sign = await getSign(JSON.stringify(params) + terminal.terminalKey)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: terminal.terminalSn + " " + sign,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.result_code !== "200") {
      throw new Error(
        `Cancel failed with result_code: ${responseData.result_code}`,
      )
    }

    return new Result(true, responseData)
  } catch (error) {
    console.error("--shouqianba cancel response error:", error)
    return new Result(false, null)
  }
}

/**
 * 收钱吧退款
 * @param terminal 终端信息，终端号和终端密钥
 * @param originalOrderCode 原订单号
 * @param refundOrderCode 和原订单关联的退款订单号
 * @param refundAmount 退款金额
 * @param operator 操作人
 * @returns
 */
export const refund = async (
  terminal: Terminal,
  originalOrderCode: string,
  refundOrderCode: string,
  refundAmount: string,
  operator: string,
): Promise<any> => {
  const url = `${env.NEXT_PUBLIC_PAY_APP_DOMAIN}/upay/v2/refund`
  const params = {
    terminal_sn: terminal.terminalSn,
    client_sn: originalOrderCode,
    refund_request_no: refundOrderCode,
    refund_amount: refundAmount,
    operator: operator,
  }

  try {
    const sign = await getSign(JSON.stringify(params) + terminal.terminalKey)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
        Authorization: terminal.terminalSn + " " + sign,
      },
    })
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()

    if (responseData.result_code !== "200") {
      console.log(
        `Refund failed, error msg: ${JSON.stringify(responseData.error_message)}`,
      )
      throw new Error(
        `Refund failed with result_code: ${responseData.result_code}`,
      )
    }
    console.log(`responseData: ${JSON.stringify(responseData)}`)
    return new Result(true, responseData)
  } catch (error) {
    console.error("--shouqianba refund response error:", error)
    return new Result(false, null)
  }
}
