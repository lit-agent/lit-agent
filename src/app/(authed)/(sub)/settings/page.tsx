"use client"

import { Button } from "@/components/ui/button"
import { maskPhone } from "@/lib/utils"
import { TODO } from "@/config"
import { signOut, useSession } from "next-auth/react"
import { BasicMutableUserInfo } from "@/components/user/basic"
import { GrayCard } from "@/components/_universal/cards"
import { MenuButton } from "@/components/_universal/line"
import SubPage from "@/components/sub-page"
import { toast } from "sonner"

export default function SettingsPage() {
  const user = useSession().data?.user

  const phone = user?.phone
  const wxid = user?.wxid

  return (
    <SubPage title={"用户中心"} className={"flex flex-col gap-4"}>
      <BasicMutableUserInfo />

      <GrayCard>
        <MenuButton
          name={"微信登录"}
          onClick={() => {
            toast.info(TODO)
          }}
        >
          {wxid ?? "点击绑定"}
        </MenuButton>

        <MenuButton
          name={"手机绑定"}
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
