"use client"

import { VerticalContainer } from "@/components/containers/vertical"
import { Button } from "@/components/ui/button"
import SubPage from "@/components/sub-page"
import { BrowserEnvironmentComp } from "@/components/_universal/browser"
import { useUser } from "@/hooks/use-user"
import { getOrder } from "@/lib/wechat/notify/functions"
import moment, { WECHAT_DATETIME_FORMAT } from "@/lib/datetime"
import { useSendWechatTemplate } from "@/lib/wechat/notify/hooks"

export default function TestWechatPusherPage() {
  const { wechat, user, phone } = useUser()
  const sendWechatTemplate = useSendWechatTemplate()

  return (
    <SubPage title={"微信消息推送测试"}>
      <VerticalContainer>
        <BrowserEnvironmentComp />

        <Button
          disabled={!wechat}
          onClick={async () => {
            sendWechatTemplate({
              template_id: "Vts-Ak-cdb4ZC96mx-o_S-IeZkrhsAnY95-J2eMa3og",
              data: {
                thing3: { value: user?.name ?? "" },
                phone_number4: { value: phone! },
                time5: { value: moment().format(WECHAT_DATETIME_FORMAT) },
                character_string2: { value: await getOrder() },
              },
            })
          }}
        >
          发送模板消息
        </Button>

        {/*// @ts-ignore*/}
        <wx-open-subscribe
          template="3xqA08YN4RJPF2Rrivw7NEtR9YwoW83u-20u9EiDMZ0"
          id="subscribe-btn"
        >
          <Button>一 次 性模版消息订阅</Button>
          {/*// @ts-ignore*/}
        </wx-open-subscribe>
      </VerticalContainer>
    </SubPage>
  )
}
