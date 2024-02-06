import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"

const main = async () => {
  // const deleted = await prisma.message.deleteMany({})
  // const deleted = await prisma.taskFrom.deleteMany({})
  // const deleted = await prisma.room.deleteMany({})
  const deleted = await prisma.user.deleteMany({})

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
  console.log("-- deleted: ", deleted.count)
}

main()
