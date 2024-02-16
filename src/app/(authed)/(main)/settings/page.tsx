"use client"

import { Button } from "@/components/ui/button"
import { maskPhone } from "@/lib/utils"
import { useUser } from "@/hooks/use-user"
import { TODO } from "@/config"
import { signOut } from "next-auth/react"
import { Label } from "@/components/ui/label"
import { BasicMutableUserInfo } from "@/components/user/basic"
import { GrayCard } from "@/components/_universal/cards"
import { MenuItem } from "@/components/_universal/line"

export default function SettingsPage() {
  const user = useUser()

  if (!user) return

  return (
    <div className={"flex flex-col gap-4"}>
      <Label className={"text-xl"}>系统设置</Label>

      <BasicMutableUserInfo />

      <GrayCard>
        <MenuItem name={"微信登录"}>{TODO}</MenuItem>
        <MenuItem name={"手机绑定"}>{maskPhone(user.phone!)}</MenuItem>
      </GrayCard>

      <GrayCard>
        <MenuItem name={"私域管理中心"}>{TODO}</MenuItem>
      </GrayCard>

      <Button onClick={() => signOut()}>退出登录</Button>
    </div>
  )
}
