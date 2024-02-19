"use client"

import { Button } from "@/components/ui/button"
import { maskPhone } from "@/lib/utils"
import { TODO } from "@/config"
import { signOut, useSession } from "next-auth/react"
import { BasicMutableUserInfo } from "@/components/user/basic"
import { GrayCard } from "@/components/_universal/cards"
import { MenuItem } from "@/components/_universal/line"
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
        <MenuItem name={"微信登录"}>
          {wxid ?? (
            <Button
              variant={"ghost"}
              onClick={() => {
                toast.info(TODO)
              }}
            >
              点击绑定
            </Button>
          )}
        </MenuItem>

        <MenuItem name={"手机绑定"}>
          {phone ? (
            maskPhone(phone)
          ) : (
            <Button
              variant={"ghost"}
              onClick={() => {
                toast.info(TODO)
              }}
            >
              点击绑定
            </Button>
          )}
        </MenuItem>
      </GrayCard>

      <GrayCard>
        <MenuItem name={"私域管理中心"}>{TODO}</MenuItem>
      </GrayCard>

      <Button onClick={() => signOut()}>退出登录</Button>
    </SubPage>
  )
}
