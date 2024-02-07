"use client"

import { MyUser } from "@/ds/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRightIcon, SearchIcon } from "lucide-react"
import { RiFireFill } from "react-icons/ri"
import { Separator } from "@/components/ui/separator"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { honorDict } from "@/lib/assets"
import { Card1 } from "./toolkits/card"
import { api } from "@/lib/trpc/react"
import Image from "next/image"
import { Hot } from "@/components/toolkits/fire-value"
import Link from "next/link"
import ProductListView from "@/components/product-list-view"

export default function UserHomePage({ user }: { user: MyUser }) {
  const { data: products = [] } = api.product.list.useQuery()

  return (
    <div className={"p-2 flex flex-col gap-4"}>
      <div className={"flex flex-col items-center gap-2"}>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{(user.name ?? user.id)[0]}</AvatarFallback>
        </Avatar>

        <div>{user.name ?? "Unnamed"}</div>

        <div className={"flex items-center gap-1"}>
          {user.honors.map((Honor, index) => {
            const Item = honorDict[Honor.id]
            return <Item key={index} />
          })}
          <ChevronRightIcon className={"w-4 h-4"} />
        </div>
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
          b={user.toTasks.filter((task) => task.status === "goon").length}
          c={"已完成"}
          d={user.toTasks.filter((task) => task.status === "finished").length}
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
          共 18 条
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
