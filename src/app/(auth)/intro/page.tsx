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
import { LoginFormViaSMS } from "@/components/login-via-sms"
import { toast } from "sonner"
import { useCsrfToken } from "@/hooks/use-auth"
import { env } from "@/env"
import { WX_PROVIDER_ID } from "@/lib/wechat/auth/config"

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

  const csrfToken = useCsrfToken()

  return (
    <div className={"mt-auto flex flex-col items-center pb-8 gap-4"}>
      <div className={"text-muted-foreground text-sm"}>
        <span className={"text-primary"}>{users.length}</span> 人已加入姑的社群
      </div>

      {/* 抓包UI的结果, or see: https://github.com/ndom91/next-auth-example-sign-in-page/blob/main/src/pages/auth/signin.js */}
      <form
        action={env.NEXT_PUBLIC_APP_URL + "/api/auth/signin/wechat-oauth"}
        method={"POST"}
      >
        {/*没有 csrfToken 会直接跳转到 signIn 页 */}
        <input hidden name={"csrfToken"} defaultValue={csrfToken} />
        {
          // 是微信环境，额外允许调用微信登录
          isWechat && <Button type={"submit"}>一键微信登录</Button>
        }
      </form>

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
