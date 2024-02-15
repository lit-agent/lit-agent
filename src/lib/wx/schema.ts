import { z } from "zod"; 
export type IWxApp = {
    appId: string
    appSecret: string
}

export interface GetAccessTokenResponse {
    // 获取到的凭证
    access_token: string;
    // 凭证有效时间，单位：秒
    expires_in: Number;
    errcode?: Number;
    errmsg?:string;
}

export interface ISubscribeNotifyTemplate {
    // 订阅通知模版ID
    template_id: string;
    // 点击卡片后跳转的页面
    page: string;
    // 卡片数据
    data: Map<string, string>;
}

export const SubscribeNotifyTemplateSchema = z.object({
    template_id: z.string(),  
    page: z.string(),  
    data: z.instanceof(Map<string, string>)  
  });

export const SubscribeNotifySchema = z.object({
    openId: z.string(),  
    accessToken: z.string(),  
    notifyData: SubscribeNotifyTemplateSchema
  });
