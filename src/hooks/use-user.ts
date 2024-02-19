import { api } from "@/lib/trpc/react"
import { useSession } from "next-auth/react"
import { SMS_PROVIDER_ID } from "@/lib/sms/config"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export const useUser = () => {
  const { data: user } = api.user.getSelf.useQuery()
  return user
}

export const useMe = () => {
  const user = useSession().data?.user

  const accounts = user?.accounts

  const wxid = accounts?.find(
    (a) => a.provider === SMS_PROVIDER_ID,
  )?.providerAccountId
  const phone = accounts?.find(
    (a) => a.provider === WECHAT_PROVIDER_ID,
  )?.providerAccountId

  return { user, wxid, phone }
}
