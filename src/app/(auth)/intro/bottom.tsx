"use client"
import { api } from "@/lib/trpc/react"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { useCsrfToken } from "@/hooks/use-auth"
import { env } from "@/env"
import { Button } from "@/components/ui/button"
import { LoginFormViaSMS } from "@/components/login-via-sms"
import { useState } from "react"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"
import { APP_URL } from "@/config"

export const Bottom = () => {
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
        action={`${APP_URL}/api/auth/signin/${WECHAT_PROVIDER_ID}`}
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
