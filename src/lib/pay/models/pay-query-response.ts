/**
 * 收钱吧查单接口返回类
 */
export class PayQueryResponse {
    /**
     * 结果码表示接口调用的业务逻辑是否成功
     * 示例: "SUCCESS"
     */
    resultCode: string;

    /**
     * 参考附录：业务执行错误码列表
     * 示例: "TRADE_TIMEOUT"
     */
    errorCode?: string;

    /**
     * 参考附录：业务执行错误码列表
     * 示例: "交易超时自动撤单"
     */
    errorMessage?: string;

    /**
     * 收钱吧终端ID
     * 示例: "01012010201201029"
     */
    terminalSn: string;

    /**
     * 收钱吧系统内部唯一订单号
     * 示例: "7894259244061958"
     */
    sn: string;

    /**
     * 商户系统订单号
     * 示例: "22345677767776"
     */
    orderCode: string;

    /**
     * 本次操作对应的流水的状态
     * 示例: "SUCCESS"
     */
    status: string;

    /**
     * 当前订单状态
     * 示例: "REFUNDED"
     */
    orderStatus: string;

    /**
     * 订单支付方式
     * 示例: "3"
     */
    payway: string;

    /**
     * 支付方式名称
     * 示例: "微信"
     */
    paywayName: string;

    /**
     * 订单付款人的id
     * 示例: 如微信"oGFfksxxsiXIWSPsNy4Mu-YhBB-I"
     */
    payerUid: string;

    /**
     * 支付宝或微信的订单号
     * 示例: "2006101016201512090096528672"
     */
    tradeNo: string;

    /**
     * 原始交易实收金额
     * 示例: "100"
     */
    totalAmount: string;

    /**
     * 订单支付时等于本次支付金额，订单退款时等于本次操作退款金额
     * 示例: "100"
     */
    settlementAmount?: string;

    /**
     * 时间戳，本次动作在收钱吧的完成时间，只有支付成功、退款成功、撤单成功才有值返回
     * 示例: "1449646835244"
     */
    finishTime?: string;

    /**
     * 时间戳，本次动作在微信或支付宝的完成时间，只有支付成功、退款成功、撤单成功才有值返回
     * 示例: "1449646835221"
     */
    channelFinishTime?: string;

    /**
     * 交易时候的商品概述
     * 示例: "wx"
     */
    subject: string;

    /**
     * 执行上次业务动作的操作员
     * 示例: "Obama"
     */
    operator: string;

    constructor(bizResponse: any) {
        this.resultCode = bizResponse.result_code;
        this.errorCode = bizResponse?.data?.error_code;
        this.errorMessage = bizResponse?.data?.error_message;
        this.terminalSn = bizResponse?.data?.terminal_sn;
        this.sn = bizResponse?.data?.sn;
        this.orderCode = bizResponse?.data?.client_sn;
        this.status = bizResponse?.data?.status;
        this.orderStatus = bizResponse?.data?.order_status;
        this.payway = bizResponse?.data?.payway;
        this.paywayName = bizResponse?.data?.payway_name;
        this.payerUid = bizResponse?.data?.payer_uid;
        this.tradeNo = bizResponse?.data?.trade_no;
        this.totalAmount = bizResponse?.data?.total_amount;
        this.settlementAmount = bizResponse?.data?.settlement_amount;
        this.finishTime = bizResponse?.data?.finish_time;
        this.channelFinishTime = bizResponse?.data?.channel_finish_time;
        this.subject = bizResponse?.data?.subject;
        this.operator = bizResponse?.data?.operator;
    }
}
