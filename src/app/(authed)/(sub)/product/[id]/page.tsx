"use client"

import { api } from "@/lib/trpc/react"

import { Button } from "@/components/ui/button"
import { JIUGU_PRODUCT_PAGE_TITLE } from "@/config"
import Link from "next/link"
import SubPage from "@/components/sub-page"
import { BottomActions } from "@/app/(authed)/(sub)/product/[id]/bottom-actions"
import { DetailArea } from "@/app/(authed)/(sub)/product/[id]/detail-area"

export default function ProductPage({
  params: { id },
}: {
  hh
  params: {
    id: string
  }
}) {
  const { data: product } = api.product.get.useQuery({ id })

  return (
    <SubPage
      title={"产品详情"}
      className={"p-4 h-full overflow-hidden flex flex-col"}
    >
      {!product ? (
        <>
          <div>商品不存在</div>

          <Link href={"/product"}>
            <Button>返回 {JIUGU_PRODUCT_PAGE_TITLE}</Button>
          </Link>
        </>
      ) : (
        <>
          <DetailArea product={product} />

          <BottomActions id={id} product={product} />
        </>
      )}
    </SubPage>
  )
}
