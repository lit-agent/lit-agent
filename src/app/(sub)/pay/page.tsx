"use client"
import { JumpPayComp } from "@/components/pay"
import SubPage from "@/components/sub-page"
import { useSearchParams } from "next/navigation"

export default function PayPage({}) {
  const params = useSearchParams()
  const id = params.get("id")
  const url = params.get("url")
  console.log({ id, url })
  if (!id || !url) return "invalid id/url"

  return (
    <SubPage title={"支付系统"} className={"p-4 flex flex-col gap-6"}>
      <JumpPayComp payId={id} payUrl={url} />
    </SubPage>
  )
}
