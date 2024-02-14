"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import { getWxAccessToken, getWxAuthUrl } from "@/lib/wx/wx-auth"
import { commentNotify } from "@/lib/wx/config"
import { Button } from "@/components/ui/button"
import { subscribeNotifySend } from "@/lib/wx/wx-notify";

export default function Page() {
  const url = getWxAuthUrl();
  const openId = "okV6w6TM289_2QtKYOExU6MI01hA";
  return (
    <VerticalContainer>
      <Button
        onClick={async () =>{
          console.log("-- get wechat grant url")
          console.log(url)
        }
        }
      >
        获取微信授权链接
      </Button>
      
      <Button
        onClick={async () =>{
          const result = getWxAccessToken();
          const copyOfCommentNotify = {
            ...commentNotify,
            data: new Map(commentNotify.data)
        };
        copyOfCommentNotify.data.set("thing2", "cyx");
        copyOfCommentNotify.data.set("thing3", "测试一下");
        copyOfCommentNotify.data.set("date4", "2024-01-01 12:00:00");
        subscribeNotifySend(openId, (await result).access_token, copyOfCommentNotify);
        }
        }
      >
        发送订阅消息
      </Button>
    </VerticalContainer>
  )
}
