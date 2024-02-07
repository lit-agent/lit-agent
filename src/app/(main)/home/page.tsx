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

export default function UserHomePage() {
  const { data: products = [] } = api.product.list.useQuery()
  const { data: bills = [] } = api.bill.list.useQuery()
  const { data: tasks = [] } = api.task.listUserTasks.useQuery()
  const user = useSession().data?.user

  if (!user) return "loading user..."

  const billsCount = bills.filter((bill) => bill.userId === user.id).length

  return (
    <div className={"p-4 flex flex-col gap-4"}>
      <div className={"flex flex-col items-center gap-2 relative"}>
        <Link href={"/settings"}>
          <HiDotsHorizontal className={"absolute top-4 left-2"} />
        </Link>

        <UserAvatar user={user} />

        <div>{user.name ?? "Unnamed"}</div>

        {user.honors.length ? (
          <div className={"flex items-center gap-1"}>
            {user.honors.map((Honor, index) => {
              const Item = honorDict[Honor.id]
              return <Item key={index} />
            })}
            <ChevronRightIcon className={"w-4 h-4"} />
          </div>
        ) : (
          <div className={"text-muted-foreground text-xs"}>暂无勋章</div>
        )}
      </div>

      <div
        className={"bg-[#FF7A44] text-white rounded p-2 flex justify-between"}
      >
        <Card1
          a={
            <div className={"inline-flex"}>
              <RiFireFill />
              持有火值
            </div>
          }
          b={user.balance}
          c={
            <div className={"inline-flex"}>
              <RiFireFill />
              历史火值
            </div>
          }
          d={user.totalEarnedFire}
          side={"L"}
        />

        <Separator
          orientation={"vertical"}
          className={"h-[120px] bg-white/25 w-[1px]"}
        />

        <Card1
          a={"当前任务"}
          b={tasks.filter((task) => task.status === UserTaskStatus.goon).length}
          c={"已完成"}
          d={
            tasks.filter((task) => task.status === UserTaskStatus.finished)
              .length
          }
          side={"R"}
        />
      </div>

      <div className={"bg-[#3D3847] p-2 rounded flex justify-between"}>
        <div className={"inline-flex gap-2"}>
          <div className={"rounded-full p-1 bg-white text-[#3D3847]"}>
            <CgArrowsExchangeAlt />
          </div>
          兑换记录
        </div>

        <div className={"inline-flex"}>
          共 {billsCount} 条
          <ChevronRightIcon />
        </div>
      </div>

      <div className={"flex gap-2"}>
        <div>全部</div>
        <div>热门</div>
        <div>实物商品</div>
        <div>虚拟服务</div>
        <SearchIcon className={"ml-auto"} />
      </div>

      <div className={"columns-2 gap-2"}>
        {products.map((product, index) => (
          <ProductListView product={product} key={index} />
        ))}
      </div>
    </div>
  )
}
