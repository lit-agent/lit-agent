import { prisma } from "@/lib/db"
import { admins } from "@/config"

const init = async () => {
  const phone = admins.jiugu.phone!
  const user = await prisma.user.findUnique({ where: { phone } })
  console.log({ phone })
  if (!user) {
    const { honors, rooms, ...data } = admins.jiugu
    console.log("[init] creating user: ", data)
    await prisma.user.create({ data })
  } else {
    console.log("skip since user existed")
  }
}

init()
