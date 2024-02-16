import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { No, Yes } from "@/components/_universal/icons"

export const BrowserEnvironmentComp = () => {
  const { isWechat, isMobile } = useRunningEnvironment()
  const IsWechat = isWechat ? Yes : No
  const IsMobile = isMobile ? Yes : No

  return (
    <div className={"inline-flex items-center gap-2"}>
      微信 <IsWechat /> 手机 <IsMobile />
    </div>
  )
}