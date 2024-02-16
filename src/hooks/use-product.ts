import { api } from "@/lib/trpc/react"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { IProductListView } from "@/schema/product"
import { toast } from "sonner"

export const useRedeemProduct = () => {
  const redeem = api.product.redeem.useMutation()
  const utils = api.useUtils()
  const router = useRouter()

  return async (product?: { id: string; count: number }) => {
    if (!product) return
    const { id, count } = product

    const res = await redeem.mutateAsync({
      // todo: mutable price
      productId: id,
      productCount: count,
    })
    if (!res.success) {
      toast.error(res.message)
    } else {
      toast.success("购买成功！")
      utils.product.invalidate()
      router.push(`/bill/list`)
    }
  }
}

export const useChargeProduct = () => {
  const charge = api.bill.charge.useMutation()
  const paymentId = nanoid()
  const router = useRouter()
  const { isWechat, isMobile } = useRunningEnvironment()

  return async (product?: { price: number }) => {
    if (!product) return
    // 一火值等于10分
    const value = product.price * 10
    const { url } = await charge.mutateAsync({
      value,
      paymentId,
    })
    router.push(
      isMobile && isWechat
        ? url
        : `/pay?id=${paymentId}&url=${encodeURIComponent(url)}`,
    )
  }
}
