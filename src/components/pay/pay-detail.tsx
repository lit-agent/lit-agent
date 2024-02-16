import { useRouter } from "next/navigation"
import {
  PaymentOtherStatus,
  PaymentStatus,
  PayOrderFinalStatus,
} from "@/lib/pay/schema"
import { LoaderIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { UnexpectedError } from "@/config"

import { PayScan } from "@/components/pay/pay-scan"

export const PayDetail = ({
  url,
  status,
  onThanks,
  onRetry,
}: {
  url: string
  status: PaymentStatus
  onThanks?: () => void
  onRetry?: () => void
}) => {
  const router = useRouter()

  switch (status) {
    case PaymentOtherStatus.CREATING:
      return <PayScan url={url} />

    case PaymentOtherStatus.CREATED:
      return (
        <div className={"w-full flex flex-col items-center gap-4"}>
          <div className={"inline-flex items-center gap-2"}>
            请在手机上确认
            <LoaderIcon className={"animate-spin"} />
          </div>
          <Button onClick={onRetry} className={"w-full"} variant={"secondary"}>
            重试
          </Button>
        </div>
      )

    case PayOrderFinalStatus.PAID:
      return (
        <div className={"w-full flex flex-col items-center gap-4"}>
          <Label>感谢你的支持！</Label>

          <Button
            className={"w-full"}
            onClick={() => {
              router.push(`/me/bills`)
            }}
          >
            返回兑换列表
          </Button>
        </div>
      )

    case PayOrderFinalStatus.CANCELED:
    case PayOrderFinalStatus.PARTIAL_REFUNDED:
    case PayOrderFinalStatus.PAY_CANCELED:
    case PayOrderFinalStatus.REFUNDED:
    case PayOrderFinalStatus.PAY_ERROR:
    case PaymentOtherStatus.TIMEOUT:
      return (
        <Button className={"w-full"} onClick={onRetry}>
          重试
        </Button>
      )
    case PaymentOtherStatus.NOT_CREATED_YET:
      return (
        <Button className={"w-full"} onClick={onRetry}>
          开始
        </Button>
      )
    default:
      throw new UnexpectedError()
  }
}
