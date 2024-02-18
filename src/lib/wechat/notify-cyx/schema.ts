import { z } from "zod"

export interface ISubscribeNotifyTemplate {
  // 订阅通知模版ID
  template_id: string
  // 点击卡片后跳转的页面
  page: string
  // 卡片数据
  data: Map<string, string>
}

export const SubscribeNotifyTemplateSchema = z.object({
  template_id: z.string(),
  page: z.string(),
  data: z.instanceof(Map<string, string>),
})
export const SubscribeNotifySchema = z.object({
  openId: z.string(),
  accessToken: z.string(),
  notifyData: SubscribeNotifyTemplateSchema,
})
