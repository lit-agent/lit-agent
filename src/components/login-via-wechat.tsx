import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export const LoginViaWechat = () => {
  const { phone, wechat } = useUser()
  const continueWithPhone = !!wechat && !phone

  return (
    <Button
      className={"w-full"}
      disabled={continueWithPhone}
      onClick={(event) => {
        signIn(WECHAT_PROVIDER_ID, { callbackUrl: "/intro?wechat=ok" })
      }}
    >
      {continueWithPhone ? "请先绑定手机号" : "直接微信登录"}
    </Button>
  )
}
