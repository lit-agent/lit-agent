import { api } from "@/lib/trpc/react"

export const useUser = () => {
  const { data: user } = api.user.getSelf.useQuery()
  return user
}
