"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import QRCode from "qrcode.react"
import { useState } from "react"
import { nanoid } from "nanoid"
import { PaymentOtherStatus } from "@/lib/pay/schema"
import { createInvoiceAction, createPrepayAction } from "@/lib/pay/actions"

export default function TestPayPage() {
  const [invoiceUrl, copyInvoiceUrl] = useCopyToClipboard()
  const [invoiceStatus, setInvoiceStatus] = useState<PaymentOtherStatus>(
    PaymentOtherStatus.DEFAULT,
  )

  return (
    <VerticalContainer>
      <Button
        onClick={async () => {
          const { url: invoiceUrl, id } = await createInvoiceAction({
            total_amount: 10,
          })
          console.log("-- res: ", invoiceUrl)
          copyInvoiceUrl(invoiceUrl)
          // window.location.href = `weixin://dl/` + invoiceUrl
          location.href = invoiceUrl
        }}
      >
        跳转支付
      </Button>

      {invoiceUrl && (
        <div className={"w-full overflow-hidden p-2"}>
          <QRCode value={invoiceUrl} />

          <div>Status: {invoiceStatus}</div>
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
