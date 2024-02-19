"use client"

import { VerticalContainer } from "@/components/containers/vertical"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { api } from "@/lib/trpc/react"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"
import { commentNotify } from "@/lib/wechat/notify-cyx/config"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { sendMessage } from "@/app/test/wechat/pusher/actions"
import { useUser } from "@/hooks/use-user"
import { toast } from "sonner"
import { WECHAT_TEMPLATE_1 } from "@/lib/wechat/notify/config"

export default function TestWechatPusherPage() {
  const [showSubscribe, setShowSubscribe] = useState(false)
  const { data: accessToken } = api.wechat.getWxGeneralAccessToken.useQuery()
  const sendSubscribeNotify = api.wechat.sendSubscribeNotify.useMutation()
  const openId1 = "okV6w6TM289_2QtKYOExU6MI01hA"
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

        <Separator orientation={"horizontal"} />

        <Label>TODO</Label>

        <Button
          onClick={async () => {
            setShowSubscribe(true)
          }}
        >
          接受订阅消息授权
        </Button>

        <Button
          onClick={async () => {
            if (accessToken) {
              const copyOfCommentNotify = {
                ...commentNotify,
                data: new Map(commentNotify.data),
              }
              copyOfCommentNotify.data.set("thing2", "cyx")
              copyOfCommentNotify.data.set("thing3", "测试一下")
              copyOfCommentNotify.data.set("date4", "2024-01-01 12:00:00")
              sendSubscribeNotify.mutate({
                openId: openId1,
                accessToken: accessToken,
                notifyData: copyOfCommentNotify,
              })
            }
          }}
        >
          发送订阅消息
        </Button>
      </VerticalContainer>
    </SubPage>
  )
}
