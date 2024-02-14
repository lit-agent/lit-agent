import { useEffect, useState } from "react"
import {
  PaymentOtherStatus,
  PaymentStatus,
  PayQueryResData,
} from "@/lib/pay/schema"
import { initPusherClient } from "@/lib/socket/config"
import { SocketEventType } from "@/lib/socket/events"

export const usePayMessage = (
  payId: string,
  defaultPayStatus: PaymentStatus = PaymentOtherStatus.NOT_CREATED_YET,
) => {
  const [payStatus, setPayStatus] = useState<PaymentStatus>(defaultPayStatus)

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

  return payStatus
}
