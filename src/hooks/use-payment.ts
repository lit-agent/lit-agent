import { api } from "@/lib/trpc/react"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import {
  PaymentOtherStatus,
  PaymentStatus,
  PayQueryResData,
} from "@/lib/pay/schema"
import { useEffect, useState } from "react"
import { initPusherClient } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"

export const useCreatePayment = () => {
  const charge = api.bill.charge.useMutation()
  const paymentId = nanoid()
  const router = useRouter()
  const { isWechat, isMobile } = useRunningEnvironment()

  return async ({
    value,
    callbackUrl,
  }: {
    value: number
    callbackUrl: string
  }) => {
    const { url } = await charge.mutateAsync({
      value,
      paymentId,
    })
    router.push(
      isMobile && isWechat
        ? url
        : `/pay?id=${paymentId}&url=${encodeURIComponent(url)}&callbackUrl=${encodeURIComponent(callbackUrl)}`,
    )
  }
}

/**
 * 只能用 socket 等技术从后端更新前端的状态，trpc 本身是做不到的
 * ref: https://chat.openai.com/c/52c13eab-1482-4a4b-bb2c-bf661722a12b
 *
 * @param paymentId
 * @param defaultPayStatus
 */
export const usePaymentStatus = (
  paymentId: string,
  defaultPayStatus: PaymentStatus = PaymentOtherStatus.NOT_CREATED_YET,
) => {
  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>(defaultPayStatus)
  
  useEffect(() => {
    if (!paymentId) return

    const pusher = initPusherClient()
    const channel = pusher.subscribe(paymentId)
    channel.bind(SocketEventType.Payment, (data: PayQueryResData) => {
      console.log("-- received data: ", data)
      setPaymentStatus(data.order_status)
    })

    return () => {
      channel.unbind(SocketEventType.Payment)
      pusher.unsubscribe(paymentId)
    }
  }, [paymentId])

  return paymentStatus
}
