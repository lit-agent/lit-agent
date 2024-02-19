"use client"
import { api } from "@/lib/trpc/react"

export const ShowUsers = () => {
  const { data: users = [] } = api.user.list.useQuery()

  return (
    <div className={"text-muted-foreground text-sm"}>
      <span className={"text-primary"}>{users.length}</span> 人已加入姑的社群
    </div>
  )
}
