import { prisma } from "@/lib/db"
import { initUser } from "./initUser"
import { WECHAT_PROVIDER_ID } from "@/lib/wechat/auth/config"

prisma.account
  .deleteMany({ where: { provider: WECHAT_PROVIDER_ID } })
  .then((res) => {
    console.log("deleted: ", res)
    initUser()
  })
  .catch((err) => {
    console.log("不存在")
  })
