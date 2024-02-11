import { prisma } from "@/lib/db"

const phone = process.argv[2]

if (phone) {
  prisma.user
    .delete({
      where: {
        // id: "jiugu",
        phone,
      },
    })
    .then((res) => {
      console.log("deleted: ", res)
    })
    .catch((err) => {
      console.log("不存在")
    })
}
