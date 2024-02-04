"use client";

import { useUser } from "@/hooks/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { $Enums } from ".prisma/client";
import Image from "next/image";
import { ChevronRightIcon, SearchIcon } from "lucide-react";
import { RiFireFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import HonorType = $Enums.HonorType;
import { MyUser } from "@/ds/user";

export default function HomePage({
  params: { user },
}: {
  params: { user: MyUser };
}) {
  if (!user) return "请登录后再试";

  return (
    <div className={"p-2 flex flex-col gap-4"}>
      <div className={"flex flex-col items-center gap-2"}>
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{(user.name ?? user.id)[0]}</AvatarFallback>
        </Avatar>

        <div>{user.name ?? "Unnamed"}</div>

        <div className={"flex items-center gap-1"}>
          {user.honors.map((honor, index) => (
            <Image
              key={honor.id}
              src={honorDict[honor.id]}
              alt={honor.id}
              width={20}
              height={40}
            />
          ))}
          <ChevronRightIcon className={"w-4 h-4"} />
        </div>
      </div>

      <div
        className={"bg-[#FF7A44] text-white rounded p-2 flex justify-between"}
      >
        <HalfCard
          a={
            <div className={"inline-flex"}>
              <RiFireFill />
              持有火值
            </div>
          }
          b={user.currentBalance}
          c={
            <div className={"inline-flex"}>
              <RiFireFill />
              历史火值
            </div>
          }
          d={user.historyBalance}
          side={"L"}
        />

        <Separator
          orientation={"vertical"}
          className={"h-[120px] bg-white/25 w-[1px]"}
        />

        <HalfCard
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
        {user.toTasks
          .filter((task) => task.status === "goon")
          .map((task, index) => (
            <div className={"rounded w-full"} key={index}>
              task: {task.id}
            </div>
          ))}
      </div>
    </div>
  );
}

const HalfCard = ({
  a,
  b,
  c,
  d,
  side,
}: {
  a: ReactNode;
  b: number;
  c: ReactNode;
  d: number;
  side: "L" | "R";
}) => (
  <div className={cn("flex flex-col gap-2", side === "R" && "items-end")}>
    <div className={"text-gray-300"}>{a}</div>
    <div className={"text-white text-2xl font-medium"}>{b}</div>
    <div className={"text-gray-300"}>{c}</div>
    <div className={"text-gray-300"}>{d}</div>
  </div>
);

const honorDict: Record<HonorType, string> = {
  NewUser: "/honor-1.svg",
  GoodFriend: "/honor-2.svg",
  HotFriend: "/honor-3.svg",
  GoodFriendEver: "/honor-4.svg",
  HotFriendEver: "/honor-5.svg",
  NewTask: "/honor-1.svg",
};
