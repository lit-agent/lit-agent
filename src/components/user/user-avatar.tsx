import { IUserView } from "@/schema/user.base"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export const UserAvatar = ({
  user,
  size = "lg",
}: {
  user?: IUserView
  size?: "sm" | "lg"
}) => (
  <Avatar
    className={cn(
      "border shrink-0",
      size === "lg" && "w-12 h-12",
      size === "sm" && "w-6 h-6",
    )}
  >
    <AvatarImage src={user?.image ?? undefined} />
    <AvatarFallback className={"bg-gray-500"}>
      {(user?.name ?? "U")[0]}
    </AvatarFallback>
  </Avatar>
)
