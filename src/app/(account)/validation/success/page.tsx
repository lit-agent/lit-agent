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

export default function ValidateSuccess() {
  const router = useRouter()
  const { data: users = [] } = api.user.list.useQuery()
  const user = useUser()

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
          disabled={!user?.image || !user?.name}
          onClick={async (event) => {
            event.preventDefault() // ref: https://stackoverflow.com/a/72021918
            router.push("/")
          }}
        >
          确定
        </Button>
      </CardFooter>
    </Card>
  )
}
