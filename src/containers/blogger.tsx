import { ComponentPropsWithoutRef } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { MediasImage } from "@/lib/assets"
import { Button } from "@/components/ui/button"
import { TbMessageChatbot } from "react-icons/tb"
import { cn } from "@/lib/utils"
import { bloggerId } from "@/config"

export const GiuguProfile = () => {
  return (
    <div className={"flex flex-col items-center gap-2 "}>
      <div className={"relative"}>
        <Avatar className={"h-14 w-14"}>
          <AvatarImage src={bloggerId.image!} />
        </Avatar>
        <div
          className={
            "absolute bottom-[3px] right-[3px] h-3 w-3 rounded-full border border-white bg-green-700"
          }
        />
      </div>

      <div className={"text-2xl font-semibold"}>{bloggerId.name}</div>

      <div>全网粉丝 62.2w</div>

      <Image src={MediasImage.src} alt={"medias"} width={120} height={30} />
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
