"use client"
import SubPage from "@/components/sub-page"
import { useRouter, useSearchParams } from "next/navigation"
import { JumpPayComp } from "@/components/pay/pay-comp"
import { useEffect } from "react"
import { cancelJob } from "@/lib/pay/actions"

export default function PayPage({}) {
  const params = useSearchParams()
  const id = params.get("id")
  const url = params.get("url")
  const callbackUrl = params.get("callbackUrl")
  console.log({ id, url, callbackUrl })
  const router = useRouter()

  if (!id || !url || !callbackUrl) return "invalid id/url"

  const clean = () => cancelJob(id)

  useEffect(() => {
    window.addEventListener("beforeunload", clean)

    return () => {
      clean()
      window.removeEventListener("beforeunload", clean)
    }
  }, [id])

  return (
    <SubPage title={"支付系统"} className={"p-4 flex flex-col gap-6"}>
      <JumpPayComp
        paymentId={id}
        paymentUrl={url}
        callbackUrl={callbackUrl}
        onThanks={() => {
          router.push(callbackUrl)
        }}
      />
    </SubPage>
  )
}
