import { api } from "@/lib/trpc/react"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { TODO } from "@/config"
import Link from "next/link"
import { UniversalTabs } from "@/components/_universal/tabs"
import ProductListView from "@/components/product/product-list-view"
import { MasonryContainer } from "@/providers/containers"

export function AllProducts() {
  const filters = ["线下", "自营", "可退款", "全部"] as const
  type Filter = (typeof filters)[number]
  const [filter, setFilter] = useState<Filter>("全部")

  const { data: products = [] } = api.product.list.useQuery()
  const filteredProducts = products.filter(
    (p) =>
      (filter === "线下" && p.isOnsite) ||
      (filter === "自营" && p.isSelfOperating) ||
      (filter === "可退款" && p.isReturnable) ||
      filter === "全部",
  )

  return (
    <UniversalTabs
      title={"姑的商城"}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
    >
      <MasonryContainer>
        {filteredProducts.map((p) => (
          <ProductListView product={p} key={p.id} />
        ))}
      </MasonryContainer>
    </UniversalTabs>
  )
}

export const MyProducts = () => {
  const filters = ["收藏", "买过", "全部"] as const
  type Filter = (typeof filters)[number]
  const [filter, setFilter] = useState<Filter>("全部")

  const { data: userProducts = [] } = api.product.listMyUserProducts.useQuery()
  const filteredUserProducts = userProducts.filter(
    (userProduct) =>
      filter === "全部" ||
      (filter === "收藏" && userProduct.isFavored) ||
      (filter === "买过" && !!userProduct.bought),
  )

  return (
    <UniversalTabs
      title={"我的产品"}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
    >
      {filteredUserProducts.length ? (
        <MasonryContainer>
          {filteredUserProducts.map((userProduct, index) => (
            <ProductListView product={userProduct.product} key={index} />
          ))}
        </MasonryContainer>
      ) : (
        <div>
          啥都没有！要不去
          <Link
            href={"/product"}
            className={"text-primary underline underline-offset-2 mx-1"}
          >
            姑的商城
          </Link>
          看看吧！
        </div>
      )}
    </UniversalTabs>
  )
}
