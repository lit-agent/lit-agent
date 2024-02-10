import { api } from "@/lib/trpc/react"

export const useUser = () => {
  const { data: user } = api.user.getSelf.useQuery()
  return user
}

/**
 * todo: replace useUser
 */
export const useAuthedUser = () => {
  const user = useUser()
  return user?.validated ? user : null
}
