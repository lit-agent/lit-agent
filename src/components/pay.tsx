import { PaymentStatus } from "@/lib/pay/schema"
import { cn } from "@/lib/utils"

export const PayStep = ({ status }: { status: PaymentStatus | null }) => {
  return (
    <ul className="steps steps-vertical w-full">
      {/*<Label className={"text-green-500"}>*/}
      {/*  <span> 状态：</span>*/}
      {/*  <span>{invoiceStatus}</span>*/}
      {/*</Label>*/}

      <li
        className={cn(
          "step step-primary",
          !status ? "text-primary" : "text-muted-foreground",
        )}
        data-content={"1"}
      >
        生成订单
      </li>

      <li
        className={cn(
          "step step-primary",
          status === "CREATED" ? "text-primary" : "text-muted-foreground",
        )}
        data-content={"2"}
      >
        创建订单
      </li>

      {status !== "PAY_CANCELED" && status !== "TIMEOUT" && (
        <li
          className={cn(
            "step step-primary",
            status === "PAID" ? "text-primary" : "text-muted-foreground",
          )}
          data-content={"3"}
        >
          支付成功
        </li>
      )}

      {status === "PAY_CANCELED" && (
        <li
          className={cn(
            "step step-primary",
            status === "PAY_CANCELED"
              ? "text-primary"
              : "text-muted-foreground",
          )}
          data-content={"3"}
        >
          支付失败
        </li>
      )}

      {status === "TIMEOUT" && (
        <li
          className={cn(
            "step step-primary",
            status === "TIMEOUT" ? "text-primary" : "text-muted-foreground",
          )}
          data-content={"3"}
        >
          支付超时
        </li>
      )}
    </ul>
  )
}
