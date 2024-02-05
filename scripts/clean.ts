import { prisma } from "@/server/db"
import { UserType } from "@prisma/client"

const main = async () => {
  // const deleted = await prisma.taskFrom.deleteMany({});
  // const deleted = await prisma.message.deleteMany({})
  const deleted = await prisma.userFollow.deleteMany({
    where: {
      OR: [
        { followedBy: { type: { not: UserType.blogger } } },
        {
          followingId: {
            equals: prisma.userFollow.fields.followedById,
          },
        },
      ],
    },
  })
  console.log("-- deleted: ", deleted.count)
}

main()
