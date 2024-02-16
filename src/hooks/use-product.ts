import { api } from "@/lib/trpc/react"
import { useRouter } from "next/navigation"
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
