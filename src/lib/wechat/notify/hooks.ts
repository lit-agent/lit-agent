import { useUser } from "@/hooks/use-user"
import {
  getWechatToken,
  ITemplate,
  sendWechatNotification,
} from "@/lib/wechat/notify/functions"

export const useSendWechatTemplate = () => {
  const { wechat } = useUser()

  return async (template: ITemplate) => {
    if (!wechat) return

    const url = location.href
    const { access_token } = await getWechatToken()
    return sendWechatNotification(access_token, wechat, template, url)
  }
}
