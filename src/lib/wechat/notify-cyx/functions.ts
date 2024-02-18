import { WX_NOTIFY_API_URL } from "@/lib/wechat/notify-cyx/config"
import { ISubscribeNotifyTemplate } from "@/lib/wechat/notify-cyx/schema"
// 向一个用户发送订阅通知
export const sendSubscribeNotify = async (
  openId: string,
  accessToken: string,
  notifyData: ISubscribeNotifyTemplate,
) => {
  const url = `${WX_NOTIFY_API_URL}?access_token=${accessToken}`

  const result = {}
  notifyData.data.forEach((value, key) => {
    result[key] = { value: value }
  })
  const param = {
    touser: openId,
    template_id: notifyData.template_id,
    page: notifyData.page,
    data: result,
  }
  const body = JSON.stringify(param)

  console.log(`url:${url}, body:${body}`)

  const response = await fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  console.log(`send subscribe notify result:${JSON.stringify(data)} openId:${openId}, notify template_id:${notifyData.template_id},
    result:${data}`)

  return data
}
