"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { nanoid } from "nanoid"
import { useRunningEnvironment } from "@/hooks/use-running-environment"
import { No, Yes } from "@/components/_universal/icons"
import { createPrepayAction } from "@/lib/pay/actions"
import { JumpPay } from "@/components/pay"

export default function TestPayPage() {
  const { isWechat, isMobile } = useRunningEnvironment()
  const IsWechat = isWechat ? Yes : No
  const IsMobile = isMobile ? Yes : No

  return (
    <VerticalContainer>
      <div className={"inline-flex items-center gap-2"}>
        微信 <IsWechat /> 手机 <IsMobile />
      </div>

      <JumpPay />

      <Button
        onClick={async () => {
          const prepayData = await createPrepayAction({
            userId: nanoid(),
            total_amount: 10,
            subject: "测试预下单支付",
          })
          console.log("-- res: ", prepayData)
        }}
      >
        预下单支付
      </Button>
    </VerticalContainer>
  )
}
