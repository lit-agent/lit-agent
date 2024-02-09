import { prisma } from "@/lib/db"
import { admins } from "@/config"

const init = async () => {
  const phone = admins.jiugu.phone!
  const user = await prisma.user.findUnique({ where: { phone } })
  if (!user) {
    const { honors, rooms, ...data } = admins.jiugu
    console.log("[init] creating user: ", data)
    const id = await prisma.user.create({ data })
    console.log("[init] created user of id: ", id)
  }
}

init()
