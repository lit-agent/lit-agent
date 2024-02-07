import { IProductListView } from "@/ds/product"
import Link from "next/link"
import Image from "next/image"
import { Hot } from "@/components/toolkits/fire-value"
import { uniq } from "lodash"

export default function ProductListView({
  product,
}: {
  product: IProductListView
}) {
  const cover = product.images[0]

  return (
    <Link href={`/product/${product.id}`} className={"rounded w-full"}>
      {cover && (
        <Image
          src={cover}
          alt={cover}
          className={"w-full h-auto rounded"}
          width={120}
          height={160}
        />
      )}

      <div>{product.title}</div>

      {!cover && <div>{product.description}</div>}

      <div className={"flex justify-between"}>
        <Hot value={product.price} />

        <div className={"text-muted-foreground"}>
          {uniq(product.bills.map((bill) => bill.userId)).length} 人兑换
        </div>
      </div>
    </Link>
  )
}
