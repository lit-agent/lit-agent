import { ComponentPropsWithoutRef, HTMLAttributes } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { TbMessageChatbot } from "react-icons/tb"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"
import { admins } from "@/config"
import { Platforms } from "@/components/platforms"

export const GiuguProfile = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 ", className)}
      {...props}
    >
      <div className={"relative"}>
        <UserAvatar user={admins.jiugu} />
        <div
          className={
            "absolute bottom-[3px] right-[3px] h-3 w-3 rounded-full border border-white bg-green-700"
          }
        />
      </div>

      <div className={"text-2xl font-semibold"}>{admins.jiugu.name}</div>

      <div>全网粉丝 62.2w</div>

      <Platforms />
    </div>
  )
}

export const BloggerContainer = ({
  children,
  className,
}: ComponentPropsWithoutRef<typeof SheetTrigger>) => {
  return (
    <Sheet>
      <SheetTrigger className={cn(className)}>{children}</SheetTrigger>

      <SheetContent side={"bottom"}>
        <div className={"flex flex-col gap-12 p-8"}>
          <GiuguProfile />

          <div className={"flex flex-col gap-2"}>
            <Button
              className={"flex items-center gap-2 bg-[#3D3847] text-white"}
            >
              <TbMessageChatbot className={"h-5 w-5"} />

              <div>呼叫本人</div>
            </Button>

            <Button className={"bg-[#3D3847] text-white"}>
              和博主商务合作
            </Button>

            <Button className={"bg-[#3D3847] text-white"}>商品售后问题</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
