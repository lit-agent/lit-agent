"use client";

import { RiFireFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { userHading } from "@/ds/mock";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import AvatarComp from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { Label } from "../../components/ui/label";
import { api } from "@/trpc/react";

export default function TaskPage() {
  const userNew = userHading;
  const { user } = useUser();

  // todo: db data
  const data = {
    userNew: userHading,
    capital: 1093,
    ranking: 355,
    // todo: 需要更好的数据结构
    finishedUsers: Array(132).fill(userHading),
  };

  const { data: tasks = [] } = api.task.list.useQuery({});

  console.log("-- tasks: ", tasks);

  return (
    <div className={"bg-[#282232] p-2 min-h-full"}>
      <div className={"flex flex-col items-center gap-4 p-4"}>
        <div className={"flex items-center gap-1 text-xs"}>
          <Avatar className={"w-4 h-4"}>
            <AvatarImage src={userHading.image!} />
          </Avatar>
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

        <AvatarComp users={data.finishedUsers} />

        <div
          className={
            "flex items-center bg-[#3D3847] text-gray-500 rounded-full px-4 py-2 text-xs"
          }
        >
          我当前排名
          <span className={"text-gray-300 mx-1"}>{data.ranking}</span>
          <ChevronRightIcon size={12} className={"ml-1"} />
        </div>

        {user?.type === "blogger" && (
          <Link href={"/task/create"}>
            <Button>创建新的任务</Button>
          </Link>
        )}
      </div>

      <div className={"flex items-center justify-between"}>
        <Label className={"text-xl text-white"}>限时群聊</Label>
        <div className={"flex items-center text-gray-500"}>
          全部任务
          <ChevronDownIcon />
        </div>
      </div>

      {tasks.map((task, index) => (
        <Link
          href={`/room/${task.room.id}`}
          key={index}
          className={
            "rounded bg-[#373041] flex items-center justify-between p-3 my-2"
          }
        >
          <div className={"flex flex-col gap-2"}>
            <div className={"flex items-center gap-2"}>
              <div className={"w-2 h-2 bg-green-500 rounded-full"} />
              <AvatarComp users={task.room.users} />
              {task.room.users.length} 人
            </div>

            <div className={"text-gray-500 text-sm"}>
              {task.room.messages.length
                ? task.room.messages[0]!.text
                : "这个群还没有发送任何消息"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

const maskName = (s: string) => s[0] + s.slice(1).replace(/./g, "*");
