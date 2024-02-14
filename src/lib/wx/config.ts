import { env } from "@/env"
import { ISubscribeNotifyTemplate, IWxApp } from "./schema";

export const WX_REDIRECT_URL = "https://lit.cs-magic.cn/api/wxauth/processCode";
export const WX_AUTH_URL = "https://open.weixin.qq.com/connect/oauth2/authorize";
// 获取用户基本数据接口
export const WX_ACCESS_URL = "https://api.weixin.qq.com/sns/oauth2/access_token";
// 基本鉴权，获取推送订阅消息的access token的接口
export const WX_REGULAR_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token";
export const WX_PROVIDER = "wechat";
export const DIRECT_URL = "https://lit.cs-magic.cn"
export const SEND_WX_NOTIFY_API = "https://api.weixin.qq.com/cgi-bin/message/subscribe/bizsend";

export const wxApp: IWxApp = {
  appId: env.WX_APP_ID,
  appSecret: env.WX_APP_SECRET,
}

export const commentNotify: ISubscribeNotifyTemplate = {
        // 订阅通知模版ID
        template_id: "3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0",
        // 点击卡片后跳转的页面
        page: DIRECT_URL,
        // 卡片数据
        data: new Map([
            // 留言用户
            ["thing2", ""],
            // 留言内容
            ["thing3", ""],
            // 留言时间
            ["date4", ""]
        ])
}
