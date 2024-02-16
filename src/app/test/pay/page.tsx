"use client"

import { Button } from "@/components/ui/button"
import { VerticalContainer } from "@/components/containers/vertical"
import { nanoid } from "nanoid"
import { createPrepayAction } from "@/lib/pay/actions"

import { JumpPayPage } from "@/components/pay/pay-page"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"

export default function TestPayPage() {
  return (
    <SubPage title={"收钱吧支付测试"}>
      <VerticalContainer>
        <BrowserEnvironmentComp />

        <JumpPayPage />

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
    </SubPage>
  )
}
