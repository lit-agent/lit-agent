import { WX_API_URL } from "@/lib/wechat/config"
import { WECHAT_AUTH_CALLBACK_URL } from "@/lib/wechat/auth/config"
import { ISubscribeNotifyTemplate } from "@/lib/wechat/notify-cyx/schema"

export const WX_NOTIFY_API_URL =
  WX_API_URL + "/cgi-bin/message/subscribe/bizsend"
export const commentNotify: ISubscribeNotifyTemplate = {
  // 订阅通知模版ID
  template_id: "3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0",
  // 点击卡片后跳转的页面
  page: WECHAT_AUTH_CALLBACK_URL,
  // 卡片数据
  data: new Map([
    // 留言用户
    ["thing2", ""],
    // 留言内容
    ["thing3", ""],
    // 留言时间
    ["date4", ""],
  ]),
}
