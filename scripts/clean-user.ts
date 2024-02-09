import { prisma } from "@/lib/db"

prisma.user
  .delete({ where: { id: "jiugu-ai" } })
  .then((res) => {
    console.log("deleted: ", res)
  })
  .catch((err) => {
    console.log("不存在")
  })
