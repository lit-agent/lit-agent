"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AwardFillIcon,
  BrandImage,
  DirectBoxSendIcon,
  FireIcon,
  Menu1Icon,
  Menu3Icon,
  RingIcon,
} from "@/lib/assets"
import { ArrowUpIcon } from "lucide-react"
import { PRIMARY_COLOR } from "@/config"
import { Indicator } from "@/components/indicator"
import { prisma } from "@/lib/db"
import { taskViewSchema } from "@/schema/task"
import { api } from "@/lib/trpc/react"
import TaskItem from "@/components/task-item"
import { useState } from "react"
import { UserTaskStatus } from "@prisma/client"

const navs = [
  { Icon: Menu1Icon, alt: "1" },
  { Icon: FireIcon, alt: "2" },
  { Icon: Menu3Icon, alt: "3" },
]

export default function HomePage() {
  const { data: userTasks = [] } = api.task.listUserTasks.useQuery()
  const [taskFilter, setTaskFilter] = useState<UserTaskStatus | undefined>(
    "goon",
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div
        className={
          "bg-background flex w-full grow flex-col gap-6 overflow-auto p-6 sm:p-8"
        }
      >
        <div id={"ring"} className={"ml-auto rounded-full bg-white p-2"}>
          <RingIcon />
        </div>

        <div
          className={
            "relative flex flex-col gap-4 rounded-3xl bg-white p-4 text-black"
          }
        >
          <div>我的火伴卡</div>

          <div className={"flex gap-4"}>
            <div> 昨日收益</div>
            <div className={"text-red-500"}>+ 0.5</div>
          </div>

          <div className={"flex items-center gap-4"}>
            <div className={"text-3xl font-medium"}>4224.23</div>
            <FireIcon color={PRIMARY_COLOR} className={"w-6 h-6"} />
          </div>

          <div className={"flex items-center gap-4"}>
            <div className={"text-gray-500"}>GDFRIENDXO0001</div>
            <Badge>好火伴</Badge>
            <Badge>Hot火伴</Badge>
          </div>

          <div className={"absolute right-2 top-0"}>
            <Image
              priority
              src={BrandImage}
              alt={""}
              className={"w-30 h-auto"}
            />
          </div>
        </div>

        <div className={"grid grid-cols-2 gap-2"}>
          <div
            className={
              "flex flex-col gap-2 rounded-3xl bg-white p-4  text-black"
            }
          >
            <div className={"flex items-center "}>
              <div className={"mr-2 text-xs font-thin text-gray-950"}>
                世界排名
              </div>
              <AwardFillIcon />
              <ArrowUpIcon />
              <div>5</div>
            </div>

            <div className={"flex items-center gap-2"}>
              <div className={"text-lg font-medium"}>253</div>
              <div className={"text-gray-500"}>/ 102293</div>
            </div>
          </div>

          <div
            className={
              "relative flex flex-col gap-2 rounded-3xl bg-white p-4 text-black"
            }
          >
            <div className={"flex items-center gap-2 "}>
              <DirectBoxSendIcon />
              <div className={"text-xs font-thin text-gray-950"}>
                本期空投池
              </div>
            </div>

            <div className={"flex items-center gap-2"}>
              <div className={"text-lg font-medium"}>423.15</div>
              <FireIcon color={PRIMARY_COLOR} className={"w-4 h-4"} />
            </div>

            <div className={"absolute right-4 top-2"}>
              <Indicator />
            </div>
          </div>
        </div>

        <div className={"flex justify-between"}>
          <Label className={"text-2xl"}>我的任务</Label>

          <div className={"flex items-center gap-2"}>
            <span
              onClick={() => {
                setTaskFilter("goon")
              }}
              className={cn(
                "hover:text-white/75 cursor-pointer",
                taskFilter === "goon" && " border-primary border-b-2",
              )}
            >
              正在参与
            </span>
            <span
              onClick={() => {
                setTaskFilter("finished")
              }}
              className={cn(
                "hover:text-white/75 cursor-pointer",
                taskFilter === "finished" && " border-primary border-b-2",
              )}
            >
              已完成
            </span>
            <span
              onClick={() => {
                setTaskFilter(undefined)
              }}
              className={cn(
                "hover:text-white/75 cursor-pointer",
                !taskFilter && " border-primary border-b-2",
              )}
            >
              全部
            </span>
          </div>
        </div>
        <div className={"flex flex-col gap-4"}>
          {userTasks
            .filter((userTask) => !taskFilter || userTask.status === taskFilter)
            .map((userTask, index) => (
              <TaskItem task={userTask.task} key={index} />
            ))}
        </div>
      </div>

      <div
        id={"nav"}
        className={"flex w-full shrink-0 justify-evenly bg-black p-4 sm:p-8"}
      >
        {navs.map(({ Icon, alt }, index) => (
          <div key={index} className={cn("rounded-[16px] p-2")}>
            <Icon key={index} />
          </div>
        ))}
      </div>
    </main>
  )
}
