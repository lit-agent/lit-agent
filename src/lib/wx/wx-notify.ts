import { SEND_WX_NOTIFY_API } from "./config";
import { ISubscribeNotifyTemplate } from "./schema";
// 向一个用户发送订阅通知
export const subscribeNotifySend = async (openId: string, accessToken: string, notifyData: ISubscribeNotifyTemplate) => {
    const url = `${SEND_WX_NOTIFY_API}?access_token=${accessToken}`;

    const result = {};
    notifyData.data.forEach((value, key) => {
        result[key] = { value: value };
    });
    const param = {
        "touser": openId,
        "template_id": notifyData.template_id,
        "page": notifyData.page,
        "data": result
    };
    const body = JSON.stringify(param);
    const response = await fetch(url, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json"
        },
      })
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json();
    console.log(`send subscribe notify result:openId:${openId}, notify template_id:${notifyData.template_id},
    result:${data}`);
    return data;
}