import { IProductListView } from "@/schema/product"
import Link from "next/link"
import Image from "next/image"
import { FireValue } from "@/components/_universal/fire-value"
import { calculateProductBuyersCount } from "@/lib/utils"

export default function ProductListView({
  product,
}: {
  product: IProductListView
}) {
  const cover = product.images[0]

  return (
    <Link href={`/product/${product.id}`}>
      <div className={"rounded-xl bg-gray-800 overflow-hidden"}>
        {cover && (
          <Image
            src={cover}
            alt={cover}
            className={"w-full h-auto"}
            width={120}
            height={160}
          />
        )}

        <div className={"p-2"}>
          <div>{product.title}</div>

          {!cover && <div>{product.description}</div>}

          <div className={"flex justify-between items-center"}>
            <FireValue value={product.price} />

            <div className={"text-muted-foreground text-xs"}>
              {calculateProductBuyersCount(product)} 人兑换
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
