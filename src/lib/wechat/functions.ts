import { WECHAT_API_URL } from "@/lib/wechat/config"
import { isWechatError } from "@/lib/wechat/schema"

/**
 * wrapper 微信的各个 auth 接口
 * @param name
 * @param path
 * @param params
 */
export const fetchWechatApi = async <T>(
  name: string,
  path: string,
  params: Record<string, string>,
) => {
  const res = await fetch(
    WECHAT_API_URL + path + "?" + new URLSearchParams(params),
  )
  const data = await res.json()
  console.log(`[wechat-api] fetched ${name}: `, data)
  if (isWechatError(data)) throw data.errmsg
  return data as T
}
