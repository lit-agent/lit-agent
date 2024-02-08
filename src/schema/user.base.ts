import { Prisma } from ".prisma/client"
import UserDefaultArgs = Prisma.UserDefaultArgs
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator

export const userViewSchema = validator<UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    image: true,
    type: true,
    validated: true,
    status: true,
    phone: true,
    rooms: {
      select: {
        id: true,
      },
    },
    honors: {
      select: {
        id: true,
      },
    },
  },
})
export type IUserListView = UserGetPayload<typeof userViewSchema>
