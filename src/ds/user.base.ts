import { Prisma } from ".prisma/client"
import UserDefaultArgs = Prisma.UserDefaultArgs
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator

export const userViewSelector = validator<UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    image: true,
    type: true,
    validated: true,
    status: true,
    phone: true,
  },
})
export type IUserView = UserGetPayload<typeof userViewSelector>