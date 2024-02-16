"use client"

import { api } from "@/lib/trpc/react"
import { IBillListView } from "@/schema/bill"
import SubPage from "@/components/sub-page"
import Image from "next/image"
import { LitBrandImage } from "@/lib/assets"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FireValue } from "@/components/_universal/fire-value"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast } from "sonner"

export default function BillListPage() {
  const { data: bills = [] } = api.bill.listMyBills.useQuery()

  return (
    <SubPage title={"我的订单"} className={"p-4 flex flex-col gap-4"}>
      {bills.map((bill, index) => (
        <BillItem bill={bill} key={index} />
      ))}
    </SubPage>
  )
}

const BillItem = ({ bill }: { bill: IBillListView }) => {
  const product = bill.products[0]!
  const value = product.count * product.price
  const utils = api.useUtils()
  const { mutate, isLoading } = api.bill.delete.useMutation({
    onSuccess: () => {
      utils.bill.listMyBills.invalidate()
      toast.success("删除成功")
    },
  })

  // todo: already used

  return (
    <div className={"rounded-lg bg-[#515662] p-2 flex flex-col gap-2"}>
      <div className={"grid grid-cols-5 items-center gap-2 text-xs"}>
        <div className={"col-span-2"}>
          <AspectRatio ratio={3 / 2}>
            <Image
              src={product.product.images[0] ?? LitBrandImage}
              alt={""}
              fill
              className={"object-cover"}
            />
          </AspectRatio>
        </div>

        <div className={"col-span-3 flex flex-col gap-2"}>
          <div className={"truncate text-lg"}>{product.product.title}</div>
          <div className={"inline-flex items-center"}>
            共{product.count}件 合计 <FireValue value={value} />
          </div>
          <div className={"truncate"}>
            兑换时间：{moment(bill.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
          </div>
        </div>
      </div>

      <div className={"flex justify-end gap-4"}>
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isLoading}
          onClick={() => {
            mutate({ billId: bill.id })
          }}
        >
          删除订单
        </Button>

        <Button className={""} size={"sm"}>
          {bill.status === "PAYING"
            ? "待支付"
            : !bill.consumed
              ? "待使用"
              : `已使用（${moment(bill.consumed).format("YYYY/MM/DD")}）`}
        </Button>
      </div>
    </div>
  )
}
