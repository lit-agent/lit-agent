import { IProductListView } from "@/schema/product"
import { api } from "@/lib/trpc/react"
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { useRouter } from "next/navigation"
import { BillStatus } from ".prisma/client"
import { toast } from "sonner"
import { TODO } from "@/config"
import { UserAvatar } from "@/components/user/user-avatar"
import { Button } from "@/components/ui/button"
import { FireIcon } from "@/lib/assets"

export const BottomActions = ({
  id,
  product,
}: {
  id: string
  product?: IProductListView
}) => {
  const { data: userProduct } = api.product.getMyUserProduct.useQuery({
    productId: id,
  })
  const utils = api.useUtils()

  const favor = api.product.favor.useMutation()
  const Favor = userProduct?.isFavored ? IoIosHeart : IoIosHeartEmpty

  const { isWechat, isMobile } = useRunningEnvironment()

  const createBill = api.bill.create.useMutation()
  const redeemBill = api.bill.redeem.useMutation()
  const router = useRouter()

  const onRedeemProduct = async () => {
    if (!product) return

    const bill = await createBill.mutateAsync({
      productId: product.id,
      productPrice: product.price,
    })
    const res = await redeemBill.mutateAsync({ billId: bill.id })
    if (res.success) {
      toast.success("购买成功！")
      utils.product.invalidate()
      utils.bill.invalidate()
      router.push(`/bill/list`)
    } else {
      toast.error(`购买失败，原因：${res.message}`)
    }
  }

  return (
    <div className={"shrink-0 flex items-center justify-between gap-6 p-2"}>
      <div
        onClick={() => {
          toast.info(TODO)
        }}
        className={"flex flex-col items-center gap-1 cursor-pointer shrink-0"}
      >
        <UserAvatar user={product?.fromUser} size={"sm"} />
        咨询
      </div>

      <div
        onClick={async () => {
          await favor.mutateAsync({
            productId: id,
            isFavored: !userProduct?.isFavored,
          })
          utils.product.getMyUserProduct.invalidate()
        }}
        className={"flex flex-col items-center gap-1 cursor-pointer shrink-0"}
      >
        <Favor className={"w-6 h-6 text-primary"} />
        收藏
      </div>

      <Button
        className={
          "flex items-center bg-[#FF854F] text-white rounded-3xl gap-2 ml-auto"
        }
        onClick={onRedeemProduct}
      >
        <span className={"inline-flex items-center"}>
          <FireIcon className={"w-4 h-4"} />
          {product?.price}
        </span>
        立即兑换
      </Button>
    </div>
  )
}
