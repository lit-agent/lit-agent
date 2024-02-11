import { prisma } from "@/lib/db"
import { JIUGU_PHONE, JIUGU_ID } from "@/config"

const init = async () => {
  const phone = JIUGU_PHONE
  const user = await prisma.user.findUnique({ where: { phone } })
  console.log({ phone })
  if (!user) {
    console.log("[init] creating user: ")
    await prisma.user.create({ data: { id: JIUGU_ID, phone } })
  } else {
    console.log("skip since user existed")
  }
}

init()
