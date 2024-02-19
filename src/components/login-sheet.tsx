"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useBrowserEnvironment } from "@/hooks/use-browser-environment"
import { LoginViaSMS } from "@/lib/sms/form"
import { Label } from "@/components/ui/label"
import { OrSeparator } from "@/components/or-separator"
import { LoginViaWechat } from "@/lib/auth/form"

export default function LoginSheet() {
  const { isWechat } = useBrowserEnvironment()
  const { wechat, phone, mainUser } = useUser()
  const [open, setOpen] = useState(
    isWechat && ((!!wechat && !phone) || (!wechat && !!phone)),
  )

  const router = useRouter()

  useEffect(() => {
    if ((!isWechat && phone) || (isWechat && phone && wechat))
      router.push(mainUser?.validated ? "/" : "/validation")
  }, [wechat, phone, isWechat])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn(buttonVariants(), "text-white")}>
        成为姑的friend
      </SheetTrigger>

      <SheetContent side={"bottom"} className={"flex flex-col gap-4"}>
        {!phone && <LoginViaSMS />}

        {!phone && wechat && (
          <Label className={"text-muted-foreground text-center"}>
            微信登录成功，请绑定手机号
          </Label>
        )}

        {isWechat && !phone && !wechat && <OrSeparator />}

        {isWechat && phone && !wechat && (
          <Label className={"text-muted-foreground text-center"}>
            手机登录成功，请绑定微信号
          </Label>
        )}

        {isWechat && !wechat && <LoginViaWechat />}
      </SheetContent>
    </Sheet>
  )
}
