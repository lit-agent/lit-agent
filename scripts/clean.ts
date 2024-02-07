import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"
import * as process from "process"

const args = process.argv
console.log("[CleanScript] process args: ", args)

const main = async () => {
  const tables = process.argv[2]?.split(",")

  const deleted = await Promise.all(
    (tables ?? []).map(async (table) => ({
      [table]: await prisma[table].deleteMany({}),
    })),
  )
  
  // const deleted = await prisma.follow.deleteMany({
  //   where: {
  //     OR: [
  //       { followedBy: { type: { not: UserType.blogger } } },
  //       {
  //         followingId: {
  //           equals: prisma.follow.fields.followedById,
  //         },
  //       },
  //     ],
  //   },
  // })
  console.log("[CleanScript] deleted: ", JSON.stringify(deleted, null, 2))
}

main()
