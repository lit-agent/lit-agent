import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IClientUser } from "@/ds/user.base"

export const UserComp = ({ user }: { user: IClientUser }) => (
  <Avatar className={"h-8 w-8"}>
    <AvatarImage src={user.image!} />
    <AvatarFallback className={"bg-gray-600"}>
      {(user.name ?? user.id)[0]}
    </AvatarFallback>
  </Avatar>
)
