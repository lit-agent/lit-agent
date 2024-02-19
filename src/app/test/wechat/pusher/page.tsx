"use client"

import { VerticalContainer } from "@/components/containers/vertical"
import { Button } from "@/components/ui/button"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"
import { sendMessage } from "@/app/test/wechat/pusher/actions"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { WECHAT_TEMPLATE_1 } from "@/lib/wechat/notify/config"

export default function TestWechatPusherPage() {
  const { wechat } = useUser()

  return (
    <SubPage title={"微信消息推送测试"}>
      <VerticalContainer>
        <BrowserEnvironmentComp />

        <Button
          onClick={async () => {
            if (!wechat) return toast.error("no wechat openid")
            await sendMessage(wechat, WECHAT_TEMPLATE_1, location.href)
          }}
        >
          发送模板消息
        </Button>

        {/*// @ts-ignore*/}
        <wx-open-subscribe
          template="3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0"
          id="subscribe-btn"
        >
          <Button>一 次 性模版消息订阅</Button>
          {/*// @ts-ignore*/}
        </wx-open-subscribe>
      </VerticalContainer>
    </SubPage>
  )
}
