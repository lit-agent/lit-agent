import { prisma } from "@/lib/db"

const init = async () => {
  await prisma.user.updateMany({
    where: {},

    data: {
      totalEarnedFire: 0,
      currentEarnedFire: 0,
      balance: 0,
    },
  })
}

init()
