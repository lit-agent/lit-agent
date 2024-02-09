"use client"

import { admins } from "@/config"
import UserAvatars, { UserAvatar } from "@/components/user-avatar"
import { RiFireFill } from "react-icons/ri"
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { last } from "lodash"
import { maskName } from "@/lib/utils"

import { ITaskView } from "@/schema/task"
import { IUserListView } from "@/schema/user.base"

export default function TaskList({
  user,
  tasks,
}: {
  user: IUserListView
  tasks: ITaskView[]
}) {
  const userNew = admins.hading

  // todo: db data
  const data = {
    userNew,
    capital: 1093,
    ranking: 355,
    // todo: 需要更好的数据结构
    finishedUsers: Array(10).fill(userNew),
  }

  console.log("[TaskPage] data: ", { user, data, tasks })

  return (
    <div className={"bg-[#282232] p-2 min-h-full"}>
      <div className={"flex flex-col items-center gap-4 p-4"}>
        <div className={"flex items-center gap-1 text-xs"}>
          <UserAvatar user={userNew} />
          {maskName(userNew.name!)}
          <span className={"text-gray-500"}>完成了作品传播任务</span>
        </div>

        <div
          className="radial-progress text-primary "
          style={{
            /* @ts-ignore */
            "--size": "10rem",
            "--value": 70,
          }}
          role="progressbar"
        >
          <div className={"flex items-center flex-col"}>
            <RiFireFill />
            <div className={"text-primary text-2xl"}>{data.capital}</div>
            <div className={"text-gray-300 text-xs"}>本期空投奖励</div>
          </div>
        </div>

        <div
          className={
            "flex items-center  text-white rounded-full px-4 py-2 text-md"
          }
        >
          期满后
          <span className={"text-primary mx-1"}>
            {data.finishedUsers.length}
          </span>
          人平分奖励 <ChevronRightIcon size={12} className={"ml-1"} />
        </div>

        <UserAvatars users={data.finishedUsers} />

        <div
          className={
            "flex items-center bg-[#3D3847] text-gray-500 rounded-full px-4 py-2 text-xs"
          }
        >
          我当前排名
          <span className={"text-gray-300 mx-1"}>{data.ranking}</span>
          <ChevronRightIcon size={12} className={"ml-1"} />
        </div>
      </div>

      <div className={"flex items-center justify-between"}>
        <Label className={"text-xl text-white"}>限时群聊</Label>
        <div className={"flex items-center text-gray-500"}>
          全部任务
          <ChevronDownIcon />
        </div>
      </div>

      {tasks
        .filter((task) => !!task.room)
        .map((task, index) => (
          <Link
            href={`/task/${task.id}`}
            key={index}
            className={
              "rounded bg-[#373041] flex items-center justify-between p-3 my-2"
            }
          >
            <div className={"flex flex-col gap-2"}>
              <div className={"flex items-center gap-2"}>
                <div className={"w-2 h-2 bg-green-500 rounded-full"} />
                <UserAvatars users={task.room!.users} />
                {task.room!.users.length} 人
              </div>

              <div className={"text-gray-500 text-sm"}>
                {task.room!.messages.length
                  ? JSON.stringify(last(task.room!.messages)!.body)
                  : "这个群还没有发送任何消息"}
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
