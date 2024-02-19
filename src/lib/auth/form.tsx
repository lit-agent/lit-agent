import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export const LoginViaWechat = () => {
  return (
    <Button
      className={"w-full"}
      onClick={(event) => {
        signIn(WECHAT_PROVIDER_ID, { callbackUrl: "/intro?wechat=ok" })
      }}
    >
      一键微信登录
    </Button>
  )
}
