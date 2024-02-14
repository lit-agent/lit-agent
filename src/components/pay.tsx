"use client"

import {
  PaymentOtherStatus,
  PaymentStatus,
  PayOrderFinalStatus,
} from "@/lib/pay/schema"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Label } from "@/components/ui/label"
import { LoaderIcon, ThumbsUpIcon } from "lucide-react"
import QRCode from "qrcode.react"
import { toast } from "sonner"
import { UnexpectedError } from "@/config"
import { usePayMessage } from "@/hooks/use-pay-message"
import { useRouter } from "next/navigation"

export const JumpPayPage = () => {
  return (
    <div className={"w-full flex flex-col items-center"}>
      <Button>跳转支付</Button>
    </div>
  )
}

export const JumpPayComp = ({
  payUrl,
  payId,
  onThanks,
}: {
  payId: string
  payUrl: string
  onThanks?: () => void
}) => {
  const payStatus = usePayMessage(payId, PaymentOtherStatus.CREATING)

  return (
    <div className={"p-4 w-full flex flex-col items-center gap-6"}>
      <PayStep status={payStatus} />

      <Separator orientation={"horizontal"} />

      <PayContentGoing url={payUrl} status={payStatus} onThanks={onThanks} />
    </div>
  )
}

export const PayContentGoing = ({
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
      return <ShowPaying url={url} />

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

export const ShowPaying = ({ url }: { url: string }) => {
  const [copiedUrl, copyUrl] = useCopyToClipboard()

  return (
    <>
      <Label className={"inline-flex items-center gap-1"}>
        <ThumbsUpIcon className={"w-4 h-4 text-primary"} />
        方法一：（微信/支付宝）扫码支付
      </Label>
      <QRCode value={url} size={192} className={"mx-auto"} />

      <Separator orientation={"horizontal"} />

      <div>方法二：复制链接到手机微信中打开</div>
      <Button
        className={"w-full"}
        onClick={() => {
          copyUrl(url)
          toast.success(`复制链接成功：${url}`)
        }}
      >
        复制
      </Button>
    </>
  )
}

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
