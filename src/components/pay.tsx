import { PaymentStatus, PayQueryResData } from "@/lib/pay/schema"
import { cn } from "@/lib/utils"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { initPusherClient } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"
import { api } from "@/lib/trpc/react"
import { cancelJob } from "@/lib/pay/actions"
import { Label } from "@/components/ui/label"
import { ThumbsUpIcon } from "lucide-react"
import QRCode from "qrcode.react"
import { toast } from "sonner"

export const JumpPay = () => {
  const [payUrl, copyInvoiceUrl] = useCopyToClipboard()
  const [payStatus, setPayStatus] = useState<PaymentStatus | null>(null)
  const [payId, setPayId] = useState("")

  const { isWechat, isMobile } = useRunningEnvironment()

  useEffect(() => {
    if (!payId) return

    const pusher = initPusherClient()
    const channel = pusher.subscribe(payId)
    channel.bind(SocketEventType.Payment, (data: PayQueryResData) => {
      console.log("-- received data: ", data)
      setPayStatus(data.order_status)
    })

    return () => {
      channel.unbind(SocketEventType.Payment)
      pusher.unsubscribe(payId)
    }
  }, [payId])

  const charge = api.bill.charge.useMutation()

  const retry = async () => {
    setPayStatus(null)

    // clean before
    console.log("-- clicked")
    if (payId) await cancelJob(payId)

    console.log("-- creating")
    const { url: invoiceUrl, id } = await charge.mutateAsync({
      value: 1,
    })
    setPayId(id)
    console.log("-- res: ", invoiceUrl)
    await copyInvoiceUrl(invoiceUrl)
    // window.location.href = `weixin://dl/` + invoiceUrl

    // 手机微信浏览器直接跳转
    if (isWechat && isMobile) location.href = invoiceUrl
  }

  return (
    <div className={"flex flex-col items-center"}>
      <Button onClick={retry}>跳转支付</Button>

      {payUrl && (
        <ShowPayComp retry={retry} url={payUrl} payStatus={payStatus} />
      )}
    </div>
  )
}

export const ShowPayComp = ({
  url,
  payStatus,
  retry,
}: {
  url: string
  payStatus: null | PaymentStatus
  retry: () => void
}) => {
  const { isWechat, isMobile } = useRunningEnvironment()

  if (isMobile && isWechat) return

  return (
    <div className={"p-4 flex flex-col items-center gap-6"}>
      <PayStep status={payStatus} />

      <Separator orientation={"horizontal"} />

      {payStatus !== "TIMEOUT" ? (
        <ShowPaying url={url} />
      ) : (
        <Button className={"w-full"} onClick={retry}>
          重试
        </Button>
      )}
    </div>
  )
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

export const PayStep = ({ status }: { status: PaymentStatus | null }) => {
  return (
    <ul className="steps w-full ">
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
