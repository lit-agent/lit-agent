import { Prisma } from "@prisma/client"
import { userViewSchema } from "@/schema/user.base"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs
import { messageViewSchema } from "@/schema/message.base"

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
                user: userViewSchema,
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
        users: userViewSchema,
      },
    },
    toRelations: {
      include: {
        toUser: userViewSchema,
      },
    },

    fromProducts: true,
    toProducts: true,
    bills: true,
  },
})
export type IUserMainView = UserGetPayload<typeof userMainViewSchema>
