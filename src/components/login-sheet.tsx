"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import LoginComp from "@/components/login-form"
import { useUser } from "@/hooks/use-user"
import { useEffect, useState } from "react"

export default function LoginSheet() {
  const { wxid, phone } = useUser()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // 有微信 id 的时候，默认为开；没有，则关
    if (wxid) setOpen(true)
  }, [wxid])

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
