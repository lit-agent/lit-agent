import { UserAvatar } from "@/components/user/user-avatar"
import { IUserAvatarBase } from "@/schema/user.base"

export const UserAvatarWithName = ({ user }: { user: IUserAvatarBase }) => (
  <div className={"inline-flex items-center gap-2"}>
    <UserAvatar user={user} size={"sm"} />
    <span>{user.name}</span>
  </div>
)
