"use client"
import { LoginViaSMS } from "@/components/login-via-sms"
import { LoginViaWechat } from "@/components/login-via-wechat"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { OrSeparator } from "@/components/or-separator"
import { useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { useUser } from "@/hooks/use-user"
import { useEffect } from "react"

export default function LoginComp() {
  const { isWechat } = useBrowserEnvironment()
  const { wechat, phone, mainUser } = useUser()
  const wechatOk = useSearchParams().get("wechat") === "ok"
  const router = useRouter()

  useEffect(() => {
    if ((!isWechat && phone) || (isWechat && phone && wechat))
      router.push(mainUser?.validated ? "/" : "/validation")
  }, [wechat, phone, isWechat])

  return (
    <>
      {!phone && <LoginViaSMS />}

      {wechatOk && !phone && (
        <Label className={"text-muted-foreground text-center"}>
          微信登录成功，请绑定手机号
        </Label>
      )}

      {!phone && !wechat && <OrSeparator />}

      {phone && isWechat && !wechat && (
        <Label className={"text-muted-foreground text-center"}>
          手机登录成功，请绑定微信号
        </Label>
      )}

      {!wechatOk && isWechat && <LoginViaWechat />}
    </>
  )
}
