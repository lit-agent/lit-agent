import { Prisma } from "@prisma/client"
import { userListViewSchema } from "@/schema/user.base"
import { messageViewSchema } from "@/schema/message.base"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs

export const userMainViewSchema = validator<UserDefaultArgs>()({
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
                messages: messageViewSchema,
              },
            },
          },
        },
      },
    },
    rooms: {
      include: {
        messages: messageViewSchema,
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
export type IUserMainView = UserGetPayload<typeof userMainViewSchema>
