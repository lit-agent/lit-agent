/**
 * 收钱吧支付订单状态终态
 */
enum PayOrderFinalStatus {
    // 订单支付成功
    PAID = "PAID",
    // 支付失败并且已经成功冲正
    PAY_CANCELED = "PAY_CANCELED",
    // 已成功全额退款
    REFUNDED = "REFUNDED",
    // 已成功部分退款
    PARTIAL_REFUNDED = "PARTIAL_REFUNDED",
    // 客户端发起撤单成功
    CANCELED = "CANCELED"
}