import { ComponentPropsWithoutRef } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { GiuguProfile } from "@/components/user/jiugu-profile"
import { Button } from "@/components/ui/button"
import { TbMessageChatbot } from "react-icons/tb"

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
