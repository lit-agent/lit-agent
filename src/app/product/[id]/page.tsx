"use client"

import { api } from "@/lib/trpc/react"
import Image from "next/image"
import { FireIcon } from "@/lib/assets"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, StarIcon } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { MyMarkdown } from "@/components/markdown"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { AvatarFallback } from "@radix-ui/react-avatar"

import { Card2 } from "@/components/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { RedeemType } from "@prisma/client"
import { calculateProductBuyersCount } from "@/lib/utils"
import { PRIMARY_COLOR } from "@/config"

export default function ProductPage({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const { data: product } = api.product.get.useQuery({ id })
  const redeem = api.product.redeem.useMutation()
  const utils = api.useUtils()

  if (!product) return "loading product..."

  const surplus = product.total - product.sold

  return (
    <div className={"flex flex-col px-2 py-4 h-full"}>
      <div className={"grow overflow-auto"}>
        <AspectRatio ratio={3 / 2} className={"w-full"}>
          <Image
            src={product.images[0] ?? "/product-1.png"}
            alt={"cover"}
            fill
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
                <span className={"text-2xl"}>{product.price}</span>
              </div>

              <span className={"text-gray-400 text-xs"}>或</span>

              <span className={"text-gray-300 text-lg"}>
                ¥ {product.price / 10}
              </span>
            </div>

            <div className={"text-2xl font-medium"}>{product.title}</div>

            <div className={"flex items-center gap-2"}>
              {product.isOnsite && (
                <Badge className={"text-yellow-500"}>线下赴约</Badge>
              )}
              {product.isSelfOperating && (
                <Badge className={"text-green-500"}>玖姑自营</Badge>
              )}
            </div>

            <Separator orientation={"horizontal"} className={"bg-gray-600"} />

            <div className={"flex items-center"}>
              <span> {calculateProductBuyersCount(product)} 人兑换</span>

              <ArrowRightIcon className={"ml-auto"} />
            </div>
          </div>
        </Card2>

        <Card2>
          <div className={"flex items-center"}>
            {product.isReturnable ? "可退换" : "不可退换"}
            <span className={"mx-2"}>·</span>
            {product.isReservationRequired ? "需要预约" : "无须预约"}

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
              <AvatarImage src={product.fromUser.image!} />
            </Avatar>

            <div>
              <div className={"font-medium"}>{product.fromUser.name}</div>
              <div>{product.description}</div>
            </div>
          </div>
        </Card2>

        <Card2>
          <div className={"flex items-center text-lg"}>商品详情</div>

          <MyMarkdown>{product.detail}</MyMarkdown>
        </Card2>
      </div>

      <div
        className={"shrink-0 flex items-center justify-between px-2 gap-4 p-2"}
      >
        <div>
          <Avatar className={"w-6 h-6"}>
            <AvatarImage src={product.fromUser.image ?? undefined} />
            <AvatarFallback>{product.fromUser.id.slice(0, 2)}</AvatarFallback>
          </Avatar>
          咨询
        </div>

        <div>
          <StarIcon className={"w-6 h-6"} />
          收藏
        </div>

        <div className={"grow grid grid-cols-2"}>
          <Button
            className={
              "flex items-center bg-[#4D3130] text-[#FF854F] rounded-r-none rounded-l-3xl"
            }
            onClick={() => {
              toast.error("暂不支持现金购买，敬请稍候！")
            }}
          >
            <div>¥{product.price / 10}</div>
            <div>现金购买</div>
          </Button>

          <Button
            className={
              "flex items-center bg-[#FF854F] text-white rounded-l-none rounded-r-3xl"
            }
            onClick={async (event) => {
              const res = await redeem.mutateAsync({
                productId: product.id,
                productCount: 1, // todo: support change count in dialog
                redeemType: RedeemType.fire,
              })
              if (!res.success) {
                toast.error(res.message)
              } else {
                toast.success("购买成功！")
                utils.product.invalidate()
              }
            }}
          >
            <div className={"flex items-center gap-1"}>
              <span className={"w-4 h-4"}>
                <FireIcon />
              </span>
              {product.price}
            </div>
            <div>火值兑换</div>
          </Button>
        </div>
      </div>
    </div>
  )
}
