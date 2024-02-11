import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { UserAvatar } from "@/components/user/user-avatar"
import { jiuguAvatar } from "@/config"
import { Platforms } from "@/components/_universal/platforms"

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
        <UserAvatar user={jiuguAvatar} />
        <div
          className={
            "absolute bottom-[3px] right-[3px] h-3 w-3 rounded-full border border-white bg-green-700"
          }
        />
      </div>

      <div className={"text-2xl font-semibold"}>{jiuguAvatar.name}</div>

      <div>全网粉丝 60w+</div>

      <Platforms />
    </div>
  )
}
