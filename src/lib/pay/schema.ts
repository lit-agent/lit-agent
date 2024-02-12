/**
 * 收钱吧跳转支付请求类
 */
export interface JumpPayRequest {
  // 商户系统订单号，必须在商户系统中唯一
  client_sn: string

  // 交易总金额，以分为单位，不能超过1亿
  total_amount: string

  // 交易概述
  subject: string

  // 门店操作员
  operator: string

  // 页面跳转同步通知页面路径，处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径
  return_url: string
}

/**
 * 收钱吧查单接口返回类
 */
export interface PayQueryResponse {
  /**
   * 结果码表示接口调用的业务逻辑是否成功
   * 示例: "SUCCESS"
   */
  resultCode: string

  data: {
    /**
     * 参考附录：业务执行错误码列表
     * 示例: "TRADE_TIMEOUT"
     */
    errorCode?: string

    /**
     * 参考附录：业务执行错误码列表
     * 示例: "交易超时自动撤单"
     */
    errorMessage?: string

    /**
     * 收钱吧终端ID
     * 示例: "01012010201201029"
     */
    terminalSn: string

    /**
     * 收钱吧系统内部唯一订单号
     * 示例: "7894259244061958"
     */
    sn: string

    /**
     * 商户系统订单号
     * 示例: "22345677767776"
     */
    orderCode: string

    /**
     * 本次操作对应的流水的状态
     * 示例: "SUCCESS"
     */
    status: string

    /**
     * 当前订单状态
     * 示例: "REFUNDED"
     */
    orderStatus: string

    /**
     * 订单支付方式
     * 示例: "3"
     */
    payway: string

    /**
     * 支付方式名称
     * 示例: "微信"
     */
    paywayName: string

    /**
     * 订单付款人的id
     * 示例: 如微信"oGFfksxxsiXIWSPsNy4Mu-YhBB-I"
     */
    payerUid: string

    /**
     * 支付宝或微信的订单号
     * 示例: "2006101016201512090096528672"
     */
    tradeNo: string

    /**
     * 原始交易实收金额
     * 示例: "100"
     */
    totalAmount: string

    /**
     * 订单支付时等于本次支付金额，订单退款时等于本次操作退款金额
     * 示例: "100"
     */
    settlementAmount?: string

    /**
     * 时间戳，本次动作在收钱吧的完成时间，只有支付成功、退款成功、撤单成功才有值返回
     * 示例: "1449646835244"
     */
    finishTime?: string

    /**
     * 时间戳，本次动作在微信或支付宝的完成时间，只有支付成功、退款成功、撤单成功才有值返回
     * 示例: "1449646835221"
     */
    channelFinishTime?: string

    /**
     * 交易时候的商品概述
     * 示例: "wx"
     */
    subject: string

    /**
     * 执行上次业务动作的操作员
     * 示例: "Obama"
     */
    operator: string
  }
}

/**
 * 收钱吧支付订单状态终态
 */
export enum PayOrderFinalStatus {
  // 订单支付成功
  PAID = "PAID",

  // 支付失败并且已经成功冲正
  PAY_CANCELED = "PAY_CANCELED",

  // 已成功全额退款
  REFUNDED = "REFUNDED",

  // 已成功部分退款
  PARTIAL_REFUNDED = "PARTIAL_REFUNDED",

  // 客户端发起撤单成功
  CANCELED = "CANCELED",
}

/**
 * 收钱吧支付其他状态
 */
export enum PaymentOtherStatus {
  DEFAULT = "DEFAULT",
  CREATED = "CREATED",
}

export type PaymentStatus = PayOrderFinalStatus | PaymentOtherStatus

/**
 * terminal / vendor
 */
export type ITerminal = {
  terminal_sn: string
  terminal_key: string
}
export type IVendor = {
  vendor_sn: string
  vendor_key: string
}
export type IRole = ITerminal | IVendor
export const isTerminal = (v: IRole): v is ITerminal => "terminal_sn" in v
