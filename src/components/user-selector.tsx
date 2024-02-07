"use client"

import { api } from "@/lib/trpc/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { UserType } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { useAppData } from "@/hooks/use-app-data"
import { Fragment } from "react"
import { MyUser } from "@/ds/user"

export const UserSelector = ({
  withBack,
  user,
}: {
  withBack?: boolean
  user: MyUser
}) => {
  const { data: users = [] } = api.user.list.useQuery()
  const { targetUserId, setTargetUserId } = useAppData()
  const router = useRouter()

  const { data: blogger } = api.user.get.useQuery(
    { id: targetUserId! },
    { enabled: !!targetUserId },
  )

  if (!targetUserId) return "loading target user..."

  return (
    <Select
      value={targetUserId}
      onValueChange={(targetUserId) => {
        setTargetUserId(targetUserId)
        // followBlogger.mutate({ bloggerId: targetUserId })
      }}
    >
      <div className={"relative w-full flex justify-center "}>
        {withBack && (
          <ChevronLeftIcon
            className={
              "absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded hover:bg-gray-800 p-1 transition-all"
            }
            onClick={(event) => {
              router.back()
            }}
          />
        )}

        <SelectTrigger
          id={"header"}
          className={
            "flex items-center justify-center gap-1 p-2 border-none focus:ring-0 focus:ring-offset-0 rounded-none bg-transparent"
          }
        >
          <Avatar className={"h-5 w-5"}>
            <AvatarImage src={blogger?.image ?? undefined} />
            <AvatarFallback>
              {(blogger?.name ?? blogger?.id ?? "U")[0]}
            </AvatarFallback>
          </Avatar>

          <div>{blogger?.name ?? "Unnamed"}</div>
        </SelectTrigger>
      </div>

      <SelectContent>
        <SelectGroup>
          {[UserType.blogger, UserType.assistant, UserType.user].map(
            (userType) => (
              <Fragment key={userType}>
                <SelectLabel>{userType}</SelectLabel>
                {users
                  .filter((user) => user.type === userType)
                  .map((targetUser) => {
                    return (
                      <SelectItem
                        value={targetUser.id}
                        key={targetUser.id}
                        disabled={targetUser.id === user.id}
                      >
                        <div className={"flex items-center gap-2"}>
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full",
                              targetUser.status === "online" && "bg-green-500",
                              targetUser.status === "offline" && "bg-gray-500",
                              targetUser.status === "busy" && "bg-yellow-500",
                            )}
                          />
                          <div>
                            {targetUser.id}({targetUser.phone})
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                <Separator orientation={"horizontal"} />
              </Fragment>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
