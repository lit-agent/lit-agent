import { IUserView } from "@/schema/user.base"
import { UserAvatar } from "@/components/user/user-avatar"

export const UserAvatarWithName = ({ user }: { user: IUserView }) => (
  <div className={"inline-flex items-center gap-2"}>
    <UserAvatar user={user} size={"sm"} />
    <span>{user.name}</span>
  </div>
)