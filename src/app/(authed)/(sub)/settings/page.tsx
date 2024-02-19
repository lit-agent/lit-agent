"use client"

import { Button } from "@/components/ui/button"
import { maskPhone } from "@/lib/utils"
import { TODO } from "@/config"
import { signIn, signOut } from "next-auth/react"
import { BasicMutableUserInfo } from "@/components/user/basic"
import { GrayCard } from "@/components/_universal/cards"
import { MenuButton } from "@/components/_universal/line"
import SubPage from "@/components/sub-page"
import { toast } from "sonner"
import { useMe } from "@/hooks/use-user"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export default function SettingsPage() {
  const { wxid, phone } = useMe()
  const { isWechat, isMobile } = useBrowserEnvironment()

  return (
    <SubPage title={"用户中心"} className={"flex flex-col gap-4"}>
      <BasicMutableUserInfo />

      <GrayCard>
        <MenuButton
          name={"微信绑定"}
          disabled={!!wxid}
          onClick={async () => {
            if (!isWechat) return toast.info("请在微信浏览器内完成绑定操作！")
            toast.info(TODO)
            await signIn(WECHAT_PROVIDER_ID)
          }}
        >
          {wxid ?? "点击绑定"}
        </MenuButton>

        <MenuButton
          name={"手机绑定"}
          disabled={!!phone}
          onClick={() => {
            toast.info(TODO)
          }}
        >
          {phone ? maskPhone(phone) : "点击绑定"}
        </MenuButton>
      </GrayCard>

      <GrayCard>
        <MenuButton name={"私域管理中心"}>{TODO}</MenuButton>
      </GrayCard>

      <Button onClick={() => signOut()}>退出登录</Button>
    </SubPage>
  )
}
