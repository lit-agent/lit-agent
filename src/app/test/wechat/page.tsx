"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import {
  commentNotify,
  WX_AUTH_URL,
  WX_REDIRECT_URL,
  wxApp,
} from "@/lib/wx/config"
import { Button, buttonVariants } from "@/components/ui/button"
import { api } from "@/lib/trpc/react"
import Head from "next/head"
import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ButtonLink } from "@/components/_universal/link"
import { useUser } from "@/hooks/use-user"
import { Label } from "@/components/ui/label"
// declare var wx: any;

export default function Page() {
  const [showSubscribe, setShowSubscribe] = useState(false)
  const { data: accessToken } = api.wechat.getWxGeneralAccessToken.useQuery()
  const { data: wxconfig } = api.wechat.getWxJsApiToken.useQuery({
    url: "https://lit.cs-magic.cn/test/wechat",
  })
  const sendSubscribeNotify = api.wechat.sendSubscribeNotify.useMutation()
  const openId1 = "okV6w6TM289_2QtKYOExU6MI01hA"

  const user = useUser()
  const userId = user?.id

  const getUrl = (scope: string) =>
    `${WX_AUTH_URL}?appid=${wxApp.appId}&redirect_uri=${WX_REDIRECT_URL}&response_type=code&scope=${scope}&state=${userId}#wechat_redirect`

  useWxInit()

  return (
    <div>
      {/* <Head>
        <script src="http://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
      </Head>
      {      showSubscribe &&
      <div dangerouslySetInnerHTML={{ __html:  
      ` <wx-open-subscribe template="3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0" id="subscribe-btn">
    <script type="text/wxtag-template" slot="style">
      <style>
        .subscribe-btn {
          color: #fff;
          background-color: #07c160;
        }
      </style>
    </script>
    <script type="text/wxtag-template">
      <button class="subscribe-btn">
        一次性模版消息订阅              
      </button>
    </script>
  </wx-open-subscribe>` }} />} */}

      <VerticalContainer>
        {/*<a href={url} target="_blank" rel="noopener noreferrer">*/}
        {/*  <Button*/}
        {/*      onClick={async () =>{*/}
        {/*        console.log("-- get wechat grant url")*/}
        {/*        console.log(url)*/}
        {/*      }*/}
        {/*      }*/}
        {/*    >*/}
        {/*    微信授权*/}
        {/*  </Button>*/}
        {/*</a>*/}

        <Label className={"text-xs"}>
          不弹出授权页面，直接跳转，只能获取用户openid
        </Label>
        <ButtonLink href={getUrl("snsapi_base")} disabled={!userId}>
          snsapi_base 授权
        </ButtonLink>

        <Label className={"text-xs"}>
          弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，
          即使在未关注的情况下，只要用户授权，也能获取其信息
        </Label>
        <ButtonLink href={getUrl("snsapi_userinfo")} disabled={!userId}>
          snsapi_userinfo 授权
        </ButtonLink>

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
    </div>
  )
}

const useWxInit = () => {
  // useEffect(()=>{
  //   if (wxconfig) {
  //     wx.config({
  //       debug: true, // 开启调试模式
  //       appId: "wx0fca1662e5518990", // 必填，公众号的唯一标识
  //       timestamp: wxconfig.timestamp, // 必填，生成签名的时间戳
  //       nonceStr: wxconfig.nonceStr, // 必填，生成签名的随机串
  //       signature: wxconfig.signature, // 必填，签名
  //       jsApiList: ['checkJsApi'], // 必填，需要使用的JS接口列表
  //       openTagList:['<wx-open-subscribe>']
  //     });
  //
  //     wx.ready(function () {
  //       console.log("grant success")
  //       // 配置成功后的逻辑
  //     });
  //
  //     wx.error(function (error) {
  //       // 配置失败后的逻辑
  //       console.error('wx.config error:', error);
  //     });
  //   }
  // }, []);
}
