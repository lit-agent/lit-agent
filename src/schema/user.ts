import { Prisma } from "@prisma/client"
import { userListViewSchema } from "@/schema/user.base"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs
import { messageViewSelector } from "@/schema/message.base"

export const mainUserSlice = validator<UserDefaultArgs>()({
  include: {
    honors: true,
    fromTasks: true,
    toTasks: {
      include: {
        task: {
          include: {
            toUsers: {
              include: {
                user: userListViewSchema,
              },
            },
            room: {
              include: {
                messages: messageViewSelector,
              },
            },
          },
        },
      },
    },
    rooms: {
      include: {
        messages: messageViewSelector,
        users: userListViewSchema,
      },
    },
    toRelations: {
      include: {
        toUser: userListViewSchema,
      },
    },

    fromProducts: true,
    toProducts: true,
    bills: true,
  },
})
export type IMainUser = UserGetPayload<typeof mainUserSlice>
