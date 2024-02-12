"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { useFormState } from "react-dom"
import { createInvoiceAction } from "@/app/(main)/test/pay/actions"
import { useCopyToClipboard } from "@uidotdev/usehooks"
import { useEffect } from "react"
import QRCode from "qrcode.react"

export default function TestPayPage() {
  const [url, action] = useFormState(createInvoiceAction, null)
  const [copied, copy] = useCopyToClipboard()

  useEffect(() => {
    if (!url) return
    copy(url)
  }, [url])

  return (
    <VerticalContainer>
      <Label>支付</Label>

      <form action={action}>
        <Button type={"submit"}>点击支付</Button>
      </form>

      {url && (
        <div className={"w-full overflow-hidden p-2"}>
          <div className={"capitalize"}>generated url:</div>

          <div className={"break-all"}>{url}</div>

          <QRCode value={url} />
        </div>
      )}
    </VerticalContainer>
  )
}
