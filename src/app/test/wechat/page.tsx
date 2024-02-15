"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import { getWxAccessToken, getWxAuthUrl } from "@/lib/wx/wx-auth"
import { commentNotify } from "@/lib/wx/config"
import { Button } from "@/components/ui/button"
import { sendSubscribeNotify } from "@/lib/wx/wx-notify";
import { api } from "@/lib/trpc/react"

export default function Page() {
  const {data: url} = api.wechat.getWxAuthUrl.useQuery();
  const {data: accessToken} = api.wechat.getWxAccessToken.useQuery();
  const sendSubscribeNotify = api.wechat.sendSubscribeNotify.useMutation();
  const openId1 = "okV6w6TM289_2QtKYOExU6MI01hA";
  return (
    <div>

    <VerticalContainer>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button
            onClick={async () =>{
              console.log("-- get wechat grant url")
              console.log(url)
            }
            }
          >
          微信授权
        </Button>
      </a>

      <Button
        onClick={async () =>{
        if (accessToken?.access_token) {
          const copyOfCommentNotify = {
            ...commentNotify,
            data: new Map(commentNotify.data)
        };
        copyOfCommentNotify.data.set("thing2", "cyx");
        copyOfCommentNotify.data.set("thing3", "测试一下");
        copyOfCommentNotify.data.set("date4", "2024-01-01 12:00:00");
        sendSubscribeNotify.mutate({openId:openId1 , accessToken:accessToken?.access_token, notifyData:copyOfCommentNotify});
        }
      }
        }
      >
        发送订阅消息
      </Button>
    </VerticalContainer>
    </div>
  )
}
