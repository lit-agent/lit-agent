"use client"

import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc/react"
import { useUser } from "@/hooks/use-user"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FireValue } from "@/components/_universal/fire-value"
import { Button } from "@/components/ui/button"
import { BasicMutableUserInfo } from "@/components/user/basic"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

import { SMS_PROVIDER_ID } from "@/lib/sms/config"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

export default function ValidateSuccess() {
  const router = useRouter()
  const { data: users = [] } = api.user.list.useQuery()
  const { user } = useUser()
  const getAuthData = api.user.getAuthData.useMutation()

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-lg"}>
          恭喜第
          <span className={"text-primary mx-1"}>
            {users.filter((u) => u.validated).length + 1}
          </span>
          位粉丝通过测试！
        </CardTitle>
      </CardHeader>

      <CardContent className={"flex flex-col gap-2"}>
        <div>你果然是姑的friend，恭喜你获得火伴身份！</div>

        <div className={"break-all"}>
          我们将赠送您
          <FireValue value={10} className={""} />
          ，可用于兑换玖姑的服务哦！
        </div>

        <div>但在进入玖姑的私域之前，请先换下马甲吧！</div>

        <BasicMutableUserInfo />
      </CardContent>

      <CardFooter>
        <Button
          className={"w-full"}
          disabled={!user?.image || !user?.name || !user?.id}
          onClick={async (event) => {
            // 手机登录，需要再次 signin 以刷新
            const { phone, code } = await getAuthData.mutateAsync()
            let signInResult
            if (phone && code) {
              // 登录，刷新token
              signInResult = await signIn(SMS_PROVIDER_ID, {
                phone,
                code,
                redirect: false,
                // todo: auth
                // callbackUrl: "/", // 感谢: https://github.com/sidebase/nuxt-auth/issues/469#issuecomment-1661909912
              })
            } else {
              signInResult = await signIn(WECHAT_PROVIDER_ID, undefined, {
                forcePopup: "false",
              })
            }
            console.log({ signInResult })

            toast.success("恭喜加入玖姑的私域！")
            router.push("/")
          }}
        >
          确定
        </Button>
      </CardFooter>
    </Card>
  )
}
