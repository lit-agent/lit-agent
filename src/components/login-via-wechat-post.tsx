import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { useCsrfToken } from "@/hooks/use-auth"
import { APP_URL } from "@/config"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"
import { Button } from "@/components/ui/button"

export const LoginViaWechatPost = () => {
  const { isWechat } = useBrowserEnvironment()
  const csrfToken = useCsrfToken()

  // 抓包UI的结果, or see: https://github.com/ndom91/next-auth-example-sign-in-page/blob/main/src/pages/auth/signin.js
  return (
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
  )
}