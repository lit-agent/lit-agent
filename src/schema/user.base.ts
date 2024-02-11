import { Prisma } from ".prisma/client"
import UserDefaultArgs = Prisma.UserDefaultArgs
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import { z } from "zod"
import { UserType } from "@prisma/client"

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
    phone: false, // 不要返回用户手机号，只在userMainViewSchema里返回自己的
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
export type IUserAvatar = {
  id: string
  name: string | null
  image: string | null
  type: UserType
}
