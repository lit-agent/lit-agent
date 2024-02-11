"use client"

import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AwardFillIcon,
  DirectBoxSendIcon,
  FireIcon,
  LitBrandImage,
  RingIcon,
} from "@/lib/assets"
import { PRIMARY_COLOR, TODO } from "@/config"
import { Indicator } from "@/components/_universal/indicator"
import { api } from "@/lib/trpc/react"
import { orderBy, sum } from "lodash"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"
import { MyTasks } from "@/components/task/tasks"
import { MyProducts } from "@/components/product/products"
import { UserTaskStatus } from "@prisma/client"
import moment from "moment"
import { UserAvatar } from "@/components/user/user-avatar"

export default function HomePage() {
  return (
    <div className={"flex w-full grow flex-col gap-6 overflow-auto min-h-full"}>
      <TopProfile />

      <MainCard />

      <SecondaryCards />

      <MyTasks />

      <MyProducts />

      {/* todo: my bills ? */}
      {/*<MyBills />*/}
    </div>
  )
}

const TopProfile = () => {
  const user = useUser()

  return (
    <div className={"flex justify-between items-center"}>
      <Link href={"/settings"} className={"flex items-center gap-2"}>
        <UserAvatar user={user} />
        <Label className={"text-2xl font-medium tracking-wider"}>
          {user?.name}
        </Label>
      </Link>

      <div
        id={"ring"}
        className={"rounded-full bg-white p-2"}
        onClick={() => toast.info(TODO)}
      >
        <RingIcon />
      </div>
    </div>
  )
}

const MainCard = () => {
  const user = useUser()

  const { data: sensitiveUser } = api.user.getSelf.useQuery()

  const { data: userTasks = [] } = api.task.listMyUserTasks.useQuery()
  const todayRevenue = sum(
    userTasks
      .filter(
        (t) =>
          t.status === UserTaskStatus.finished &&
          +t.updatedAt >= +moment().startOf("d").toDate(),
      )
      .map((t) => t.task.value),
  )

  return (
    <div
      className={
        "relative flex flex-col gap-4 rounded-3xl bg-white p-4 text-black"
      }
    >
      <div>我的火伴卡</div>

      <div className={"flex gap-4"}>
        <div> 今日火值收益</div>
        <div className={"text-red-500"}>+ {todayRevenue}</div>
      </div>

      <div className={"flex items-center gap-4"}>
        <div className={"text-3xl font-medium"}>{sensitiveUser?.balance}</div>
        <FireIcon color={PRIMARY_COLOR} className={"w-6 h-6"} />
      </div>

      <div className={"flex items-center gap-4"}>
        <div className={"text-gray-500 truncate"}>{user?.id}</div>
        <Badge className={"shrink-0"}>好火伴</Badge>
        <Badge className={"shrink-0"}>Hot火伴</Badge>
      </div>

      <Image
        priority
        src={LitBrandImage}
        alt={""}
        width={320}
        height={240}
        className={"absolute right-2 top-2 w-40 sm:w-64"}
      />
    </div>
  )
}

const WordRandingCard = () => {
  const user = useUser()

  const { data: users = [] } = api.user.list.useQuery()

  const myRank =
    orderBy(users, "totalEarnedFire", "desc").findIndex(
      (u) => u.id === user?.id,
    ) + 1

  return (
    <div className={"flex flex-col gap-2 rounded-3xl bg-white p-4 text-black"}>
      <div className={"flex items-center gap-2"}>
        <AwardFillIcon />
        <div className={"text-xs font-thin text-gray-950"}>世界排名</div>
      </div>

      <div className={"flex items-center gap-2 ml-2"}>
        <div className={"text-lg font-medium"}>{myRank}</div>
        <div className={"text-gray-500"}>/ {users.length}</div>
      </div>
    </div>
  )
}

const KongtouCard = () => {
  return (
    <div
      className={
        "relative flex flex-col gap-2 rounded-3xl bg-white p-4 text-black"
      }
    >
      <div className={"flex items-center gap-2 "}>
        <DirectBoxSendIcon />
        <div className={"text-xs font-thin text-gray-950"}>本期空投池</div>
      </div>

      <div className={"flex items-center gap-2"}>
        <div className={"text-lg font-medium"}>敬请期待！</div>
        <FireIcon color={PRIMARY_COLOR} className={"w-4 h-4"} />
      </div>

      <div className={"absolute right-4 top-2"}>
        <Indicator />
      </div>
    </div>
  )
}

const SecondaryCards = () => {
  return (
    <div className={"grid grid-cols-2 gap-2"}>
      <WordRandingCard />

      <KongtouCard />
    </div>
  )
}
