import { cn } from "@/lib/utils"

export const PayStep = ({ status }: { status: PaymentStatus }) => {
  return (
    <ul className="steps w-full ">
      {/*<Label className={"text-green-500"}>*/}
      {/*  <span> 状态：</span>*/}
      {/*  <span>{invoiceStatus}</span>*/}
      {/*</Label>*/}

      <li
        className={cn(
          "step step-primary",
          status === "CREATING"
            ? "text-primary underline underline-offset-4"
            : "text-muted-foreground",
        )}
        data-content={"1"}
      >
        发起订单
      </li>

      <li
        className={cn(
          "step step-primary",
          status === "CREATED"
            ? "text-primary underline underline-offset-4"
            : "text-muted-foreground",
        )}
        data-content={"2"}
      >
        等待支付
      </li>

      {status !== "PAY_CANCELED" && status !== "TIMEOUT" && (
        <li
          className={cn(
            "step step-primary",
            status === "PAID"
              ? "text-primary underline underline-offset-4"
              : "text-muted-foreground",
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
              ? "text-primary underline underline-offset-4"
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
            "step step-primary underline underline-offset-4",
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
