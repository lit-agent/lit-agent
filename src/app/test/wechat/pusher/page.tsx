"use client"

import { VerticalContainer } from "@/components/containers/vertical"
import { Button } from "@/components/ui/button"
import { commentNotify } from "@/lib/wx/config"
import { useState } from "react"
import { api } from "@/lib/trpc/react"

export default function WxPusherPage() {
  const [showSubscribe, setShowSubscribe] = useState(false)
  const { data: accessToken } = api.wechat.getWxGeneralAccessToken.useQuery()
  const { data: wxconfig } = api.wechat.getWxJsApiToken.useQuery({
    url: "https://lit.cs-magic.cn/test/wechat",
  })
  const sendSubscribeNotify = api.wechat.sendSubscribeNotify.useMutation()
  const openId1 = "okV6w6TM289_2QtKYOExU6MI01hA"

  return (
    <VerticalContainer>
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
  )
}
