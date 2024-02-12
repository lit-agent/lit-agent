"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useFormState } from "react-dom"
import { createInvoiceAction, createPrepayAction } from "@/lib/pay/actions"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { useEffect } from "react"
import QRCode from "qrcode.react"

export default function TestPayPage() {
  const [invoiceUrl, invoiceAction] = useFormState(createInvoiceAction, null)
  const [prepayData, prepayAction] = useFormState(createPrepayAction, null)
  const [copied, copy] = useCopyToClipboard()

  useEffect(() => {
    if (!invoiceUrl) return
    copy(invoiceUrl)
    // window.location.href = `weixin://dl/` + invoiceUrl
  }, [invoiceUrl])

  useEffect(() => {
    if (!prepayData) return
    console.log({ prepayData })
  }, [prepayData])

  return (
    <VerticalContainer>
      <Label>跳转支付</Label>

      <form action={invoiceAction}>
        <Button type={"submit"}>点击支付</Button>
      </form>

      {invoiceUrl && (
        <div className={"w-full overflow-hidden p-2"}>
          <div className={"capitalize"}>generated url:</div>

          <div className={"break-all"}>{invoiceUrl}</div>

          <QRCode value={invoiceUrl} />
        </div>
      )}

      <form action={prepayAction}>
        <Button type={"submit"}>预下单支付</Button>
      </form>
    </VerticalContainer>
  )
}
