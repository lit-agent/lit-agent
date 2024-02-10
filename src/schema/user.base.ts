import { Prisma } from ".prisma/client"
import UserDefaultArgs = Prisma.UserDefaultArgs
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import { z } from "zod"

export const userSafeUpdateSchema = z.object({
  name: z.string().optional(),
  nameUpdated: z.date().optional(),
  image: z.string().optional(),
})
export type IUserSafeUpdate = z.infer<typeof userSafeUpdateSchema>

export const userListViewSchema = validator<UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    nameUpdated: true,
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
export type IUserView = UserGetPayload<typeof userListViewSchema>
