import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export const LoginViaWechat = () => {
  const { phone, wxid } = useUser()
  const continueWithPhone = !!wxid && !phone

  return (
    <Button
      className={"w-full"}
      disabled={continueWithPhone}
      onClick={(event) => {
        signIn(WECHAT_PROVIDER_ID, { redirect: false, callbackUrl: "" })
      }}
    >
      {continueWithPhone ? "请先绑定手机号" : "直接微信登录"}
    </Button>
  )
}
