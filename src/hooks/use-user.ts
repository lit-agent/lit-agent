import { api } from "@/lib/trpc/react"
import { useSession } from "next-auth/react"
import { SMS_PROVIDER_ID } from "@/lib/sms/config"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export const useUser = () => {
  const user = useSession().data?.user

  const id = user?.id

  const { data: mainUser } = api.user.getSelf.useQuery(undefined, {
    enabled: !!user,
  })

  const accounts = mainUser?.accounts

  const wechat = accounts?.find(
    (a) => a.provider === WECHAT_PROVIDER_ID,
  )?.providerAccountId

  const phone = accounts?.find(
    (a) => a.provider === SMS_PROVIDER_ID,
  )?.providerAccountId

  return { id, wechat, phone, mainUser, user: mainUser }
}
