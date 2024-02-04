"use client";

import { api } from "@/trpc/react";
import Image from "next/image";
import { PropsWithChildren } from "react";
import { FireIcon } from "@/lib/assets";
import { PRIMARY_COLOR } from "@/const";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MyMarkdown } from "@/containers/markdown";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { AvatarFallback } from "@radix-ui/react-avatar";

const Card = ({ children }: PropsWithChildren) => (
  <div className={"m-2 bg-[#2A2435]"}>
    <div className={"rounded p-2 bg-[#3D3847]"}>{children}</div>
  </div>
);

export default function ProductPage() {
  const { data: products = [] } = api.product.list.useQuery();

  console.log("-- products: ", products);

  const product = products[0];

  if (!product) return "商品不存在！";

  const surplus = product.total - product.toUsers.length;

  return (
    <div className={"flex flex-col"}>
      <div className={"grow overflow-auto"}>
        <AspectRatio ratio={3 / 2} className={"w-full"}>
          <Image
            src={product.images[0] ?? "/product-1.png"}
            alt={"cover"}
            fill
          />
        </AspectRatio>

        <Card>
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
              <span> {product.toUsers.length} 人兑换</span>

              <ArrowRightIcon className={"ml-auto"} />
            </div>
          </div>
        </Card>

        <Card>
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
        </Card>

        <Card>
          <div className={"flex gap-2 items-start"}>
            <Avatar>
              <AvatarImage src={product.fromUser.image!} />
            </Avatar>

            <div>
              <div className={"font-medium"}>{product.fromUser.name}</div>
              <div>{product.description}</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className={"flex items-center text-lg"}>商品详情</div>

          <MyMarkdown>{product.detail}</MyMarkdown>
        </Card>
      </div>

      <div className={"shrink-0 flex items-center justify-between"}>
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

        <div className={"grid grid-cols-2"}>
          <div className={"flex items-center bg-[#4D3130] text-[#FF854F]"}>
            <div>¥{product.price / 10}</div>
            <div>现金购买</div>
          </div>

          <div className={"flex items-center bg-[#FF854F] text-white"}>
            <div className={"flex items-center gap-1"}>
              <span className={"w-4 h-4"}>
                <FireIcon />
              </span>
              {product.price}
            </div>
            <div>火值兑换</div>
          </div>
        </div>
      </div>
    </div>
  );
}
