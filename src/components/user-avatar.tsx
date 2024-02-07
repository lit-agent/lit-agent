import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUserView } from "@/schema/user.base"

/**
 * space-x 这个是控制子孩子距离，不用tailwind的话，要用 css 写，比较麻烦
 * 所以遵循设计标准，只暴露几种尺寸的 size，而非任意数值
 * @param users
 * @param maxN
 * @param size
 * @constructor
 */
export default function AvatarComp({
  users,
  maxN = 6,
  size = "sm",
}: {
  users: IUserView[]
  maxN?: number
  size?: "sm" | "lg"
}) {
  return (
    <div
      className={cn(
        "avatar-group rtl:space-x-reverse flex",
        size === "lg" && "-space-x-6",
        size === "sm" && "-space-x-3",
      )}
    >
      {users.slice(0, maxN).map((user, index) => (
        <UserAvatar user={user} size={size} key={index} />
      ))}

      {users.length > maxN && (
        <Avatar
          className={cn(
            "border",
            size === "lg" && "w-12 h-12",
            size === "sm" && "w-6 h-6",
          )}
        >
          <AvatarFallback
            className={cn("text-gray-300", size === "sm" && "text-[8px]")}
          >
            {users.length > 99 ? "+99" : users.length}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

export const UserAvatar = ({
  user,
  size = "lg",
}: {
  user: IUserView
  size?: "sm" | "lg"
}) => (
  <Avatar
    className={cn(
      "border",
      size === "lg" && "w-12 h-12",
      size === "sm" && "w-6 h-6",
    )}
  >
    <AvatarImage src={user.image ?? undefined} />
    <AvatarFallback className={"bg-gray-500"}>
      {(user.name ?? "U")[0]}
    </AvatarFallback>
  </Avatar>
)
