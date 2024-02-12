import { queryAction } from "./actions"

import { ITerminal, PayOrderFinalStatus } from "@/lib/pay/schema"

/**
 * todo: thread for monitoring payment status in both frontend and backend
 *
 *   // 调用支付接口
 *   fetch(payUrl, {
 *     redirect: "follow",
 *   })
 *     .then((data) => {
 *       const poller = new Poller(terminal, id)
 *       poller.start()
 *     })
 *     .catch((error) => {
 *       console.error("调用支付接口时发生错误", error)
 *     })
 *     .finally(() => {
 *       console.log("[pay] finished")
 *     })
 */

/**
 * 收钱吧支付结果轮询poller
 * 跳转支付后需要调用轮询获取支付结果
 * 实现逻辑：轮询查单接口，轮询的时间控制在100-120s之间，轮询的间隔建议为前30秒内2秒一次，之后5秒一次
 */
export class Poller {
  public terminalSn: string
  public terminalKey: string
  public orderCode: string
  private startTime: number
  private endTime: number
  private pollIntervalEarly: number
  private pollIntervalLate: number
  private earlyPeriod: number

  constructor(role: ITerminal, orderCode: string) {
    this.terminalSn = role.terminal_sn
    this.terminalKey = role.terminal_key
    this.orderCode = orderCode
    this.startTime = Date.now()
    this.endTime = this.startTime + 100 * 1000 // 100s
    this.pollIntervalEarly = 2 * 1000 // 2s
    this.pollIntervalLate = 5 * 1000 // 5s
    this.earlyPeriod = 30 * 1000 // 30s
  }

  private shouldContinue(): boolean {
    return Date.now() < this.endTime
  }

  private getPollInterval(): number {
    return Date.now() - this.startTime < this.earlyPeriod
      ? this.pollIntervalEarly
      : this.pollIntervalLate
  }

  private isFinalOrderStatus(value: any): boolean {
    if (typeof value !== "string") {
      return false
    }
    return Object.values(PayOrderFinalStatus).includes(
      value as PayOrderFinalStatus,
    )
  }

  private async poll() {
    try {
      const result = await queryAction(this.orderCode)

      // 如果订单不是终态且轮训时间没到
      if (
        !this.isFinalOrderStatus(result?.data.orderStatus) &&
        this.shouldContinue()
      ) {
        setTimeout(() => this.poll(), this.getPollInterval())
      } else {
        if (this.isFinalOrderStatus(result?.data.orderStatus)) {
          /**
           * 如果是订单是终态，执行落库等业务操作
           */
        } else {
          /**
           * 如果不是终态，则说明支付有问题需要修正
           */
        }
        console.log("Polling completed.")
      }
      console.log("Polling result:", JSON.stringify(result))
    } catch (error) {
      console.error("Error during polling:", error)
    }
  }

  public start() {
    this.poll()
  }
}
