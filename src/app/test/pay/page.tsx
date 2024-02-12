"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import QRCode from "qrcode.react"
import { useState } from "react"
import { nanoid } from "nanoid"
import { PaymentOtherStatus } from "@/lib/pay/schema"
import { createInvoiceAction, createPrepayAction } from "@/lib/pay/actions"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { No, Yes } from "@/components/_universal/icons"

export default function TestPayPage() {
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()
  const [invoiceStatus, setInvoiceStatus] = useState<PaymentOtherStatus>(
    PaymentOtherStatus.DEFAULT,
  )

  const { isWechat, isMobile } = useRunningEnvironment()
  const IsWechat = isWechat ? Yes : No
  const IsMobile = isMobile ? Yes : No

  return (
    <VerticalContainer>
      <div className={"inline-flex items-center gap-2"}>
        微信 <IsWechat /> 手机 <IsMobile />
      </div>

      <Button
        onClick={async () => {
          const { url: invoiceUrl, id } = await createInvoiceAction({
            total_amount: 10,
          })
          console.log("-- res: ", invoiceUrl)
          await copyInvoiceUrl(invoiceUrl)
          // window.location.href = `weixin://dl/` + invoiceUrl

          // 手机微信浏览器直接跳转
          if (isWechat && isMobile) location.href = invoiceUrl
        }}
      >
        跳转支付
      </Button>

      {invoiceUrl && (
        <div>
          <ShowInvoice invoice={invoiceUrl} />
        </div>
      )}

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

const ShowInvoice = ({ invoice }: { invoice: string }) => {
  const { isWechat, isMobile } = useRunningEnvironment()
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()

  if (!isMobile) return <QRCode value={invoice} />

  if (!isWechat)
    return (
      <div className={"w-full p-4"}>
        <div>
          支付链接已复制到剪切板，请到手机微信中粘贴访问（推荐使用微信浏览器访问本网站）
        </div>
        <div
          className={"break-all underline text-xs"}
          onClick={() => {
            copyInvoiceUrl(invoice)
          }}
        >
          {invoice}
        </div>
      </div>
    )
}
