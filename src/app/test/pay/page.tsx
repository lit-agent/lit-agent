"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import QRCode from "qrcode.react"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import {
  PaymentOtherStatus,
  PaymentStatus,
  PayQueryResData,
} from "@/lib/pay/schema"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { No, Yes } from "@/components/_universal/icons"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cancelJob, createPrepayAction } from "@/lib/pay/actions"
import { initPusherClient } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"
import { api } from "@/lib/trpc/react"
import { PayStep } from "@/components/pay"

export default function TestPayPage() {
  const [payUrl, copyInvoiceUrl] = useCopyToClipboard()
  const [payStatus, setPayStatus] = useState<PaymentStatus | null>(null)
  const [payId, setPayId] = useState("")

  const { isWechat, isMobile } = useRunningEnvironment()
  const IsWechat = isWechat ? Yes : No
  const IsMobile = isMobile ? Yes : No

  const clean = () => {
    cancelJob(payId)
  }

  useEffect(() => {
    if (!payId) return

    window.addEventListener("beforeunload", clean)
    const pusher = initPusherClient()
    const channel = pusher.subscribe(payId)
    channel.bind(SocketEventType.Payment, (data: PayQueryResData) => {
      console.log("-- received data: ", data)
      setPayStatus(data.order_status)
    })

    return () => {
      clean()
      window.removeEventListener("beforeunload", clean)
      channel.unbind(SocketEventType.Payment)
      pusher.unsubscribe(payId)
    }
  }, [payId])

  const charge = api.bill.charge.useMutation()

  useEffect(() => {}, [payId])

  // const getWxAccount = api.user.wxAuth.useMutation()

  return (
    <VerticalContainer>
      <div className={"inline-flex items-center gap-2"}>
        微信 <IsWechat /> 手机 <IsMobile />
      </div>

      <Button
        onClick={async () => {
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
        }}
      >
        跳转支付
      </Button>

      {payUrl && <ShowInvoice invoice={payUrl} payStatus={payStatus} />}

      <Button
        onClick={async () => {
          const prepayData = await createPrepayAction({
            userId: nanoid(),
            total_amount: 10,
            subject: "测试预下单支付",
          })
          console.log("-- res: ", prepayData)
        }}
      >
        预下单支付
      </Button>
    </VerticalContainer>
  )
}

const ShowInvoice = ({
  invoice,
  payStatus,
}: {
  invoice: string
  payStatus: null | PaymentStatus
}) => {
  const { isWechat, isMobile } = useRunningEnvironment()
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()

  if (isMobile && isWechat) return

  return (
    <div className={"p-4 flex flex-col items-start gap-4"}>
      <PayStep status={payStatus} />

      <Label>方法一：（微信/支付宝）扫码支付</Label>
      <QRCode value={invoice} />

      <div>方法二：复制链接到手机微信中打开</div>
      <Button
        onClick={() => {
          copyInvoiceUrl(invoice)
          toast.success(`复制链接成功：${invoice}`)
        }}
      >
        复制
      </Button>

      {/*<Button onClick={() => cancelJob(id)}>取消</Button>*/}
    </div>
  )
}
