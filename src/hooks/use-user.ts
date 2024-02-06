import { useSession } from "next-auth/react"

export const useUser = () => useSession().data?.user
