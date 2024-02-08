// 收钱吧跳转支付请求类
 export class PayRequest {
    // 商户系统订单号，必须在商户系统中唯一
    orderCode: string;
    // 交易总金额，以分为单位，不能超过1亿
    totalAmount: string;
    // 交易概述
    subject: string;
    // 门店操作员
    operator: string;
    // 页面跳转同步通知页面路径，处理完请求后，当前页面自动跳转到商户网站里指定页面的http路径
    returnUrl: string;

    // 全部必填
    constructor(orderCode: string, totalAmount: string, subject: string, operator: string, returnUrl: string) {
        this.orderCode = orderCode;
        this.totalAmount = totalAmount;
        this.subject = subject;
        this.operator = operator;
        this.returnUrl = returnUrl;
    }
}