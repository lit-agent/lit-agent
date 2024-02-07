"use client"

import Image from "next/image"
import { BgCircleImage, BroadcastImage, FireIcon } from "@/lib/assets"
import { TrendingUpIcon } from "lucide-react"
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri"
import { Indicator } from "@/components/toolkits/indicator"
import { Separator } from "@/components/ui/separator"
import { MessageContainer } from "@/components/message-item"
import { UserComp } from "@/components/user"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { MyUser } from "@/ds/user"
import { ITaskView } from "@/ds/task"

export default function TaskOk({
  task,
  user,
}: {
  user: MyUser
  task: ITaskView
}) {
  const refTop = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div
        ref={refTop}
        className={"relative w-full p-4 flex flex-col gap-2 items-center"}
      >
        <Image
          src={BgCircleImage}
          alt={"bg"}
          width={320}
          height={320}
          className={"absolute left-1/2 -translate-x-1/2 top-8"}
        />

        <div className={"w-full flex justify-between"}>
          <div className={"flex items-center gap-2"}>
            <TrendingUpIcon className={"text-primary"} />
            帮作品传播
          </div>

          <div className={"flex items-center gap-1 text-primary"}>
            <FireIcon className={"w-4 h-4"} />
            10
          </div>
        </div>

        <Image
          src={BroadcastImage}
          alt={"broadcast"}
          width={160}
          height={240}
        />

        <div className={"flex justify-center items-center gap-2"}>
          <RiDoubleQuotesL />
          <span className={"w-2/3"}>
            {"我会在我的社群如实分享更多律师咨询的细节，欢迎去同名公众号..."}
          </span>
          <RiDoubleQuotesR />
        </div>
      </div>

      <div
        className={
          "absolute w-full rounded-3xl flex flex-col gap-4 border shadow-lg p-2 bg-[#3D3847]"
        }
        style={{
          top: refTop.current?.getBoundingClientRect().height,
          // left: 0
        }}
      >
        <div className={"flex flex-col gap-2 items-center"}>
          <div className={"flex items-center gap-2"}>
            <Indicator /> 183 人限时群聊
          </div>
          <div className={"text-xs text-muted-foreground tracking-widest"}>
            剩余1天17小时
          </div>
        </div>
        <Separator orientation={"horizontal"} className={"bg-white/10"} />
        <MessageContainer user={user}>hello</MessageContainer>
        <Separator orientation={"horizontal"} className={"bg-white/10 mb-12"} />
      </div>

      <div
        className={
          "fixed bottom-0 left-0 z-50 w-full p-2 flex items-center gap-2 bg-[#3D3847]"
        }
      >
        <UserComp user={user} />
        <Input
          placeholder={"观点碰撞产生共鸣💥"}
          className={
            " bg-[#56525F] text-primary focus-visible:ring-0 focus-visible:ring-offset-0"
          }
        />
      </div>
    </div>
  )
}
