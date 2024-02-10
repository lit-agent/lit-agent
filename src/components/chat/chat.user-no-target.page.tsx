import { AwardFillIcon } from "@/lib/assets"
import { UserType } from "@prisma/client"
import { useAppData } from "@/lib/store/use-app-data"
import { api } from "@/lib/trpc/react"
import { UserAvatar } from "@/components/user/user-avatar"

export default function ChatUserNoTargetPage() {
  const { setTargetUserId } = useAppData()
  const { data: users = [] } = api.user.list.useQuery()

  return (
    <div className={"h-full flex flex-col gap-4 justify-center items-center"}>
      <div>total users: {users.length}</div>
      <div>
        total bloggers:{" "}
        {users.filter((user) => user.type === UserType.blogger).length}
      </div>

      {users
        .filter((user) => user.type === UserType.blogger)
        .map((user) => (
          <div
            key={user.id}
            className={"flex items-center gap-2"}
            onClick={() => {
              setTargetUserId(user.id)
            }}
          >
            <UserAvatar user={user} />
            <span>{user.name}</span>
            <span>{user.type === UserType.blogger && <AwardFillIcon />}</span>
          </div>
        ))}
    </div>
  )
}
