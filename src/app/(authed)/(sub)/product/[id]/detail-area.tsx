import { IProductListView } from "@/schema/product"
import { useUser } from "@/hooks/use-user"
import { api } from "@/lib/trpc/react"
import { useRouter } from "next/navigation"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { FireIcon, LitBrandImage } from "@/lib/assets"
import { PRIMARY_COLOR } from "@/config"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import UserAvatars from "@/components/user/user-avatars"
import { countBuyersOfProduct, getBuyersOfProduct } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { MarkdownContainer } from "@/providers/containers"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card2 } from "./card2"

export const DetailArea = ({ product }: { product?: IProductListView }) => {
  const surplus = product ? product.total - product.sold : 0
  const user = useUser()
  const deleteProduct = api.product.delete.useMutation()
  const utils = api.useUtils()
  const router = useRouter()

  return (
    <div className={"grow overflow-auto flex flex-col gap-2 -mx-4 p-4"}>
      <AspectRatio ratio={3 / 2} className={"w-full"}>
        <Image
          src={product?.images[0] ?? LitBrandImage}
          alt={"cover"}
          fill
          className={"object-cover"}
        />
      </AspectRatio>

      <Card2>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex items-center gap-2"}>
            <div
              className={"text-primary flex items-baseline"}
              color={PRIMARY_COLOR}
            >
              <FireIcon className={"w-5 h-5"} />
              <span className={"text-2xl"}>{product?.price}</span>
            </div>

            <span className={"text-gray-400 text-xs"}>或</span>

            <span className={"text-gray-300 text-lg"}>
              ¥ {product ? product.price / 10 : 0}
            </span>
          </div>

          <div className={"text-2xl font-medium"}>{product?.title}</div>

          <div className={"flex items-center gap-2"}>
            {product?.isOnsite && (
              <Badge className={"text-yellow-500"}>线下赴约</Badge>
            )}
            {product?.isSelfOperating && (
              <Badge className={"text-green-500"}>玖姑自营</Badge>
            )}
          </div>

          <Separator orientation={"horizontal"} className={"bg-gray-600"} />

          <div className={"flex items-center gap-2"}>
            <UserAvatars users={getBuyersOfProduct(product)} />
            <span> {countBuyersOfProduct(product)} 人兑换</span>
          </div>
        </div>
      </Card2>

      <Card2>
        <div className={"flex items-center"}>
          {product?.isReturnable ? "可退换" : "不可退换"}
          <span className={"mx-2"}>·</span>
          {product?.isReservationRequired ? "需要预约" : "无须预约"}

          <span className={"ml-auto"}>
            {surplus > 10 ? (
              <span className={"text-gray-500"}>库存充足</span>
            ) : surplus > 0 ? (
              <span className={"text-yellow-500"}>库存紧张</span>
            ) : (
              <span className={"text-red-500"}>暂无库存</span>
            )}
          </span>
        </div>
      </Card2>

      <Card2>
        <div className={"flex gap-2 items-start"}>
          <Avatar>
            <AvatarImage src={product?.fromUser.image!} />
          </Avatar>

          <div>
            <div className={"font-medium"}>{product?.fromUser.name}</div>
            <div>{product?.description}</div>
          </div>
        </div>
      </Card2>

      <Card2>
        <div className={"flex items-center text-lg"}>商品详情</div>

        <MarkdownContainer>{product?.detail ?? "暂无详情！"}</MarkdownContainer>
      </Card2>

      {user && user.id === product?.fromUserId && (
        <Button
          variant={"destructive"}
          onClick={async () => {
            deleteProduct
              .mutateAsync({ id: product.id })
              .then(() => {
                toast.success("删除成功！")
                router.push("/product")
                utils.product.invalidate()
              })
              .catch(() => {
                toast.error("删除失败！")
              })
          }}
        >
          删除产品
        </Button>
      )}
    </div>
  )
}
