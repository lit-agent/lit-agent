import { PaymentOtherStatus, PayOrderFinalStatus } from "@/lib/pay/schema"
import { Separator } from "@/components/ui/separator"
import { PayDetail } from "@/components/pay/pay-detail"
import { PayStep } from "@/components/pay/pay-step"
import { useEffect } from "react"
import { api } from "@/lib/trpc/react"
import { useRedeemProduct } from "@/hooks/use-product"
import { useCreatePayment, usePaymentStatus } from "@/hooks/use-payment"
import { PaymentStatus } from "@prisma/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UnexpectedError } from "@/schema/errors"

export const JumpPayComp = ({
  paymentUrl,
  paymentId,
  callbackUrl,
  onThanks,
}: {
  paymentId: string
  paymentUrl: string
  callbackUrl: string
  onThanks?: () => void
}) => {
  const { data: payment } = api.pay.get.useQuery({ paymentId })
  const paymentStatus = usePaymentStatus(paymentId, PaymentOtherStatus.CREATING)

  const onRetry = () => {
    console.log("pay comp: ", { payment })
    if (!payment) return
    // todo: create new payment from bill
    // chargeProduct({ price: payment.value })
  }

  const router = useRouter()
  useEffect(() => {
    if (paymentStatus === PaymentStatus.PAID) {
      toast.success("支付成功！")
      router.push(callbackUrl)
    }
  }, [paymentStatus])

  if (!paymentStatus) return "loading payment..."

  return (
    <div className={"p-4 w-full flex flex-col items-center gap-6"}>
      <PayStep status={paymentStatus} />

      <Separator orientation={"horizontal"} />

      <PayDetail
        url={paymentUrl}
        status={paymentStatus}
        onThanks={onThanks}
        onRetry={onRetry}
      />
    </div>
  )
}
