import { prisma } from "@/lib/db"
import { initUser } from "./initUser"

const phone = process.argv[2]

if (phone?.toLowerCase() === "all") {
  prisma.user
    .deleteMany({})
    .then((res) => {
      console.log("deleted: ", res)
    })
    .catch((err) => {
      console.log("不存在")
    })
} else if (phone) {
  prisma.user
    .delete({
      where: {
        // id: "jiugu",
        phone,
      },
    })
    .then((res) => {
      console.log("deleted: ", res)

      initUser()
    })
    .catch((err) => {
      console.log("不存在")
    })
}
