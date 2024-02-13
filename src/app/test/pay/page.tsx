"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import QRCode from "qrcode.react"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import { PaymentStatus } from "@/lib/pay/schema"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { No, Yes } from "@/components/_universal/icons"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cancelJob, createPrepayAction } from "@/lib/pay/actions"
import { api } from "@/lib/trpc/react"

export default function TestPayPage() {
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()
  const [invoiceStatus, setInvoiceStatus] = useState<PaymentStatus | null>(null)
  const [invoiceId, setInvoiceId] = useState("")

  const { isWechat, isMobile } = useRunningEnvironment()
  const IsWechat = isWechat ? Yes : No
  const IsMobile = isMobile ? Yes : No

  const clean = () => {
    cancelJob(invoiceId)
  }

  useEffect(() => {
    window.addEventListener("beforeunload", clean)

    return () => {
      clean()
      window.removeEventListener("beforeunload", clean)
    }
  }, [invoiceId])

  const charge = api.bill.charge.useMutation()

  useEffect(() => {
    // pusherClient.
  }, [])

  return (
    <VerticalContainer>
      <div className={"inline-flex items-center gap-2"}>
        微信 <IsWechat /> 手机 <IsMobile />
      </div>

      <Button
        onClick={async () => {
          // clean before
          console.log("-- clicked")
          if (invoiceId) await cancelJob(invoiceId)

          console.log("-- creating")
          const { url: invoiceUrl, id } = await charge.mutateAsync({
            value: 1,
          })
          setInvoiceId(id)
          console.log("-- res: ", invoiceUrl)
          await copyInvoiceUrl(invoiceUrl)
          // window.location.href = `weixin://dl/` + invoiceUrl

          // 手机微信浏览器直接跳转
          if (isWechat && isMobile) location.href = invoiceUrl
        }}
      >
        跳转支付
      </Button>

      {invoiceUrl && <ShowInvoice id={invoiceId} invoice={invoiceUrl} />}

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

const ShowInvoice = ({ invoice, id }: { invoice: string; id: string }) => {
  const { isWechat, isMobile } = useRunningEnvironment()
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()

  if (isMobile && isWechat) return

  return (
    <div className={"p-4 flex flex-col items-start gap-4"}>
      <Label>状态：</Label>

      <ul className="steps steps-vertical w-full">
        <li className="step step-primary" data-content={"✓"}>
          创建订单
        </li>
        <li className="step step-primary" data-content={"●"}>
          支付
        </li>
        <li className="step">支付成功</li>
      </ul>

      <Button
        onClick={() => {
          cancelJob(id)
        }}
      >
        取消
      </Button>

      <Label>方法一：扫码支付</Label>
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
    </div>
  )
}
