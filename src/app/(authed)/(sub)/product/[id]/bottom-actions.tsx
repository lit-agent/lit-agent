import { IProductListView } from "@/schema/product"
import { api } from "@/lib/trpc/react"
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TODO } from "@/config"
import { UserAvatar } from "@/components/user/user-avatar"
import { Button } from "@/components/ui/button"
import { FireIcon } from "@/lib/assets"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FireValue } from "@/components/_universal/fire-value"
import { useUser } from "@/hooks/use-user"
import { useCreatePayment } from "@/hooks/use-payment"

export const BottomActions = ({
  id,
  product,
}: {
  id: string
  product: IProductListView
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
  const [shouldCharge, setShouldCharge] = useState(false)
  const user = useUser()
  const diff = product.price - (user?.balance ?? 0)
  const createPayment = useCreatePayment()

  const onRedeemProduct = async () => {
    if (!product) return

    const bill = await createBill.mutateAsync({
      productId: product.id,
      productPrice: product.price,
    })

    const res = await redeemBill.mutateAsync({ billId: bill.id })
    console.log("[redeem] result: ", res)

    if (res.success) {
      toast.success("购买成功！")
      utils.product.invalidate()
      utils.bill.invalidate()
      router.push(`/bill/list`)
    } else {
      setShouldCharge(true)
      // toast.error(`购买失败，原因：${res.message}`)
    }
  }
  const paymentValues = [1, 10, 100]
  const soldOut = product.sold >= product.total

  return (
    <div className={"shrink-0 flex items-center justify-between gap-6 p-2"}>
      <Dialog open={shouldCharge} onOpenChange={setShouldCharge}>
        <DialogContent className={"max-w-[80%]"}>
          <DialogHeader>
            <DialogTitle>充值提醒</DialogTitle>
            <DialogDescription
              className={"break-all items-center flex flex-col py-2"}
            >
              <span className={"inline-flex items-center gap-1"}>
                您还需 <FireValue value={diff} /> 方可以兑换玖姑的：
              </span>
              <span className={"text-primary text-lg"}>{product!.title}</span>
            </DialogDescription>
          </DialogHeader>

          <div className={"grid grid-cols-3 gap-4"}>
            {paymentValues.map((value) => {
              return (
                <Button
                  key={value}
                  onClick={() => {
                    createPayment({
                      value: value * 10,
                      callbackUrl: location.href,
                    })
                  }}
                >
                  {value}
                </Button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

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
        disabled={soldOut}
      >
        {soldOut ? (
          "暂无库存"
        ) : (
          <>
            <span className={"inline-flex items-center"}>
              <FireIcon className={"w-4 h-4"} />
              {product?.price}
            </span>
            立即兑换
          </>
        )}
      </Button>
    </div>
  )
}
