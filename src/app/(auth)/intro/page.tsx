import { CoverTextBigImage } from "@/lib/assets"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { GiuguProfile } from "@/components/user/jiugu-profile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { ShowUsers } from "@/components/show-users"
import LoginComp from "@/components/login-form"
import LoginSheet from "@/components/login-sheet"

export default function IntroPage() {
  return (
    <div
      className={cn(
        "flex flex-col justify-end items-center h-full bg-[#2A2435] relative",
        "flex-col", // 使用倒序保证页面布局稳定性，封面图是后出现的，todo:更好的办法
      )}
    >
      <Image
        src={CoverTextBigImage}
        alt={"landing cover"}
        fill
        className={"object-cover"}
        priority
      />

      <div className={"z-50 bg-black/75 w-full"}>
        <GiuguProfile className={"-mt-6 mb-6"} />

        <div className={"mt-auto flex flex-col items-center pb-8 gap-4"}>
          <ShowUsers />

          <LoginSheet />
        </div>
      </div>
    </div>
  )
}
