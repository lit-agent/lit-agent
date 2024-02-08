import { useSession } from "next-auth/react"

export const useUser = () => useSession().data?.user

export const useAuthedUser = () => {
  const user = useUser()
  return user?.validated ? user : null
}
