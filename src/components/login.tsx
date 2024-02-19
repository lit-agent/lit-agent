"use client"
import { LoginViaSMS } from "@/components/login-via-sms"
import { LoginViaWechat } from "@/components/login-via-wechat"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { OrSeparator } from "@/components/or-separator"

export default function LoginComp() {
  const { isWechat } = useBrowserEnvironment()
  return (
    <>
      <LoginViaSMS />

      {isWechat && (
        <>
          <OrSeparator />

          <LoginViaWechat />
        </>
      )}
    </>
  )
}
