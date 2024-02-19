"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoginComp from "@/components/login-form"
import { useUser } from "@/hooks/use-user"
import { useEffect, useState } from "react"

export default function LoginSheet() {
  const { wechat, phone } = useUser()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 有微信 id 的时候，默认为开；没有，则关
    if (wechat) setOpen(true)
  }, [wechat])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn(buttonVariants(), "text-white")}>
        成为姑的friend
      </SheetTrigger>

      <SheetContent side={"bottom"} className={"flex flex-col gap-4"}>
        <LoginComp />
      </SheetContent>
    </Sheet>
  )
}
