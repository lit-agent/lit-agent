import { IUserListView } from "@/schema/user.base"
import { UserAvatar } from "@/components/user/user-avatar"
import { FireValue } from "@/components/_universal/fire-value"
import { cn } from "@/lib/utils"

export const RankItem = ({
  user,
  rank,
  n,
}: {
  user?: IUserListView
  rank: number
  n?: number
}) => {
  return (
    <div className={"w-full flex items-center gap-2 shrink-0"}>
      <div
        className={cn(
          "shrink-0 w-4",
          "text-gray-400 font-semibold",
          rank === 1 && " text-xl text-yellow-300",
          rank === 2 && " text-xl text-slate-300",
          rank === 3 && " text-xl text-orange-300",
        )}
      >
        {rank}
      </div>

      <div
        className={cn(
          "py-2  border-white/10 flex items-center gap-2 grow overflow-hidden",
          n !== rank && "border-b",
        )}
      >
        <UserAvatar user={user} />

        <div>{user?.name}</div>

        <FireValue value={user?.totalEarnedFire} className={"ml-auto"} />
      </div>
    </div>
  )
}
