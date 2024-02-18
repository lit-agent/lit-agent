/**
 * @see: https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
 */

import { env } from "@/env"

// note: app_id 是要暴露给前端的，但是secret不行，所以这里要分别导出
export const WX_APP_ID = env.NEXT_PUBLIC_WX_APP_ID
export const WX_APP_SECRET = env.WX_APP_SECRET

export const WX_API_URL = "https://api.weixin.qq.com"
