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
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import TaskItem from "@/components/task-item"
import { useState } from "react"
import { TaskStatus } from "@prisma/client"

export default function PlaygroundPage() {
  const { data: tasks = [] } = api.task.listTasks.useQuery()
  const user = useUser()
  const { data: userTasks = [] } = api.task.listMyUserTasks.useQuery()
  const [taskFilter, setTaskFilter] = useState<TaskStatus | undefined>("on")

  return (
    <div className={"w-full p-4 relative flex flex-col gap-4"}>
      <div className={"flex justify-between"}>
        <Label className={"text-xl"}>姑的任务广场</Label>

        <div className={"flex items-center gap-2"}>
          <span
            onClick={() => {
              setTaskFilter("on")
            }}
            className={cn(
              "hover:text-white/75 cursor-pointer",
              taskFilter === "on" && " border-primary border-b-2",
            )}
          >
            正在进行
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
            已结束
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

      {tasks
        .filter((task) => !taskFilter || task.status === taskFilter)
        .map((task, index) => (
          <TaskItem task={task} key={index} />
        ))}
    </div>
  )
}
