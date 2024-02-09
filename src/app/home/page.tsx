"use client"
import { api } from "@/lib/trpc/react"
import { useSession } from "next-auth/react"
import { UserAvatar } from "@/components/user-avatar"
import { honorDict } from "@/lib/assets"
import { ChevronRightIcon, SearchIcon } from "lucide-react"
import { Card1 } from "@/components/card"
import { RiFireFill } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import ProductListView from "@/components/product-list-view"
import { HiDotsHorizontal } from "react-icons/hi"
import Link from "next/link"
import { $Enums } from ".prisma/client"
import UserTaskStatus = $Enums.UserTaskStatus
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { TODO } from "@/config"
import { Button } from "@/components/ui/button"

export default function UserHomePage() {
  const { data: products = [] } = api.product.list.useQuery()
  const { data: bills = [] } = api.bill.list.useQuery()
  const user = useUser()

  const billsCount = bills.filter((bill) => bill.userId === user?.id).length

  return (
    <div className={"w-full p-4 relative flex flex-col gap-4"}>
      <div className={"flex items-baseline gap-4"}>
        <div className={"text-white font-medium"}>姑的商城</div>

        <Button
          variant={"ghost"}
          className={"flex items-centre text-primary text-xs"}
          onClick={() => toast.info(TODO)}
        >
          切换 <ChevronRightIcon className={"w-4 h-4"} />
        </Button>
      </div>

      <Link
        href={"/bill"}
        className={"w-ful bg-[#3D3847] rounded flex justify-between p-2"}
      >
        <div className={"inline-flex gap-2"}>
          <div className={"rounded-full p-1 bg-white text-[#3D3847]"}>
            <CgArrowsExchangeAlt />
          </div>
          兑换记录
        </div>

        <div className={"inline-flex text-muted-foreground"}>
          共 {billsCount} 条
          <ChevronRightIcon />
        </div>
      </Link>

      <div className={"w-full flex gap-2 text-muted-foreground"}>
        <div onClick={() => toast.info(TODO)}>全部</div>
        <div onClick={() => toast.info(TODO)}>热门</div>
        <div onClick={() => toast.info(TODO)}>实物商品</div>
        <div onClick={() => toast.info(TODO)}>虚拟服务</div>
        <SearchIcon className={"ml-auto"} onClick={() => toast.info(TODO)} />
      </div>

      <div className={"w-full columns-2 gap-4"}>
        {products.map((product, index) => (
          <ProductListView product={product} key={index} />
        ))}
      </div>
    </div>
  )
}
