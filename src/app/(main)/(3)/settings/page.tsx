"use client"

import { Button } from "@/components/ui/button"
import { ComponentProps, PropsWithChildren } from "react"
import { cn, maskPhone } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { useUser } from "@/hooks/use-user"
import { DEFAULT_USERNAME, TODO } from "@/config"
import { signOut } from "next-auth/react"

export default function SettingsPage() {
  const user = useUser()!

  return (
    <div className={"flex flex-col gap-2 p-2"}>
      <GrayCard>
        <MenuItem name={"头像"}>
          <UserAvatar user={user} />
        </MenuItem>

        <MenuItem name={"昵称"}>{user.name ?? DEFAULT_USERNAME}</MenuItem>
      </GrayCard>

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

const GrayCard = ({ children }: PropsWithChildren) => (
  <div className={"rounded-lg bg-[#3B3545] p-2 flex flex-col gap-2"}>
    {children}
  </div>
)

const MenuItem = ({
  name,
  className,
  children,
  ...props
}: { name: string } & ComponentProps<typeof Button>) => (
  <Button
    className={cn(
      "justify-between bg-transparent border-b border-white/10 rounded-none last:border-none h-fit",
      className,
    )}
    {...props}
  >
    <div className={"text-white"}>{name}</div>

    <div className={"text-muted-foreground flex items-center gap-1"}>
      {children}

      <ChevronRightIcon className={"w-5 h-5"} />
    </div>
  </Button>
)
