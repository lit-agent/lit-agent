import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUserView } from "@/schema/user.base"

export const UserComp = ({ user }: { user: IUserView }) => (
  <Avatar className={"h-8 w-8"}>
    <AvatarImage src={user.image!} />
    <AvatarFallback className={"bg-gray-600"}>
      {(user.name ?? user.id)[0]}
    </AvatarFallback>
  </Avatar>
)
