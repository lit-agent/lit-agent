import { usePaymentStatus } from "@/hooks/use-payment-status"
import { PaymentOtherStatus, PayOrderFinalStatus } from "@/lib/pay/schema"
import { Separator } from "@/components/ui/separator"
import { PayDetail } from "@/components/pay/pay-detail"
import { PayStep } from "@/components/pay/pay-step"
import { useEffect } from "react"
import { api } from "@/lib/trpc/react"
import { UnexpectedError } from "@/config"
import { useChargeProduct, useRedeemProduct } from "@/hooks/use-product"

export const JumpPayComp = ({
  paymentUrl,
  paymentId,
  onThanks,
}: {
  paymentId: string
  paymentUrl: string
  onThanks?: () => void
}) => {
  const { data: payment } = api.pay.get.useQuery({ paymentId })
  const paymentStatus = usePaymentStatus(paymentId, PaymentOtherStatus.CREATING)
  const redeemProduct = useRedeemProduct()
  const chargeProduct = useChargeProduct()

  const onRetry = () => {
    console.log("pay comp: ", { payment })
    if (!payment) return
    // todo: create new payment from bill
    chargeProduct({ price: payment.value })
  }

  useEffect(() => {
    if (!payment?.bill || paymentStatus !== PayOrderFinalStatus.PAID) return

    const products = payment.bill.products
    if (products.length !== 1) throw new UnexpectedError()

    const { productId, count } = products[0]!
    redeemProduct({ id: productId, count })
  }, [paymentStatus, payment])

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
