"use client"
import { VerticalContainer } from "@/components/containers/vertical"
import { commentNotify } from "@/lib/wx/config"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/trpc/react"
import Head from 'next/head'
import { useEffect, useState } from "react"
// declare var wx: any;

export default function Page() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const {data: url} = api.wechat.getWxAuthUrl.useQuery();
  const {data: accessToken} = api.wechat.getWxGeneralAccessToken.useQuery();
  const {data: wxconfig} = api.wechat.getWxJsApiToken.useQuery({url:"https://lit.cs-magic.cn/test/wechat"});
  const sendSubscribeNotify = api.wechat.sendSubscribeNotify.useMutation();
  const openId1 = "okV6w6TM289_2QtKYOExU6MI01hA";
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
  
  //     wx.ready(function () {
  //       console.log("grant success")
  //       // 配置成功后的逻辑
  //     });
  
  //     wx.error(function (error) {
  //       // 配置失败后的逻辑
  //       console.error('wx.config error:', error);
  //     });
  //   }
  // }, []);
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
        setShowSubscribe(true);
      }
        }
      >
        接受订阅消息授权
      </Button>

      <Button
      
      onClick={async () =>{
      if (accessToken) {
        const copyOfCommentNotify = {
          ...commentNotify,
          data: new Map(commentNotify.data)
      };
      copyOfCommentNotify.data.set("thing2", "cyx");
      copyOfCommentNotify.data.set("thing3", "测试一下");
      copyOfCommentNotify.data.set("date4", "2024-01-01 12:00:00");
      sendSubscribeNotify.mutate({openId:openId1 , accessToken:accessToken, notifyData:copyOfCommentNotify});
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
