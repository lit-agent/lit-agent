"use client"

import { CoverTextBigImage } from "@/lib/assets"
import Image from "next/image"
import { Button } from "@/components/ui/button"

import "react-phone-number-input/style.css"
import { useState } from "react"
import { api } from "@/lib/trpc/react"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { GiuguProfile } from "@/components/user/jiugu-profile"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { WX_PROVIDER_ID } from "@/lib/wx/config"
import { LoginFormViaSMS } from "@/components/login-via-sms"
import { toast } from "sonner"

export default function IntroPage() {
  return (
    <div
      className={cn(
        "flex flex-col justify-end items-center h-full bg-[#2A2435] relative",
        "flex-col", // 使用倒序保证页面布局稳定性，封面图是后出现的，todo:更好的办法
      )}
    >
      <Image
        src={CoverTextBigImage}
        alt={"landing cover"}
        fill
        className={"object-cover"}
        priority
      />

      <div className={"z-50 bg-black/75 w-full"}>
        <GiuguProfile className={"-mt-6 mb-6"} />

        <Bottom />
      </div>
    </div>
  )
}

const Bottom = () => {
  const { data: users = [] } = api.user.list.useQuery()

  const { isWechat } = useBrowserEnvironment()
  const [smsOpen, setSmsOpen] = useState(false)

  return (
    <div className={"mt-auto flex flex-col items-center pb-8 gap-4"}>
      <div className={"text-muted-foreground text-sm"}>
        <span className={"text-primary"}>{users.length}</span> 人已加入姑的社群
      </div>

      {
        // 是微信环境，额外允许调用微信登录
        isWechat && (
          <Button
            onClick={() => {
              signIn(WX_PROVIDER_ID, { redirect: false })
                .then((res) => {
                  toast.success("login success")
                })
                .catch((err) => {
                  console.error(err)
                  toast.error("login failed")
                })
            }}
          >
            一键微信登录
          </Button>
        )
      }

      <Button
        className={"text-white "}
        onClick={() => {
          setSmsOpen(true)
        }}
      >
        成为姑的friend
      </Button>

      <LoginFormViaSMS open={smsOpen} setOpen={setSmsOpen} />
    </div>
  )
}
