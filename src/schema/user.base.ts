import { Prisma } from ".prisma/client"
import { z } from "zod"
import { UserType } from "@prisma/client"
import UserDefaultArgs = Prisma.UserDefaultArgs
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator

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
    totalEarnedFire: true,
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
export type IUserListView = UserGetPayload<typeof userListViewSchema>

export interface IUserAvatarBase {
  image: string | null
  name: string | null
}

export interface IUserAvatar extends IUserAvatarBase {
  id: string
  type: UserType
}
