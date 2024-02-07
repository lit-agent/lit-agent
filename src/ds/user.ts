import { Prisma } from "@prisma/client"
import { userViewSelector } from "@/ds/user.base"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs
import { messageViewSelector } from "@/ds/message.base"

export const myUserSlice = validator<UserDefaultArgs>()({
  include: {
    honors: true,
    fromTasks: true,
    toTasks: {
      include: {
        task: {
          include: {
            toUsers: {
              include: {
                user: userViewSelector,
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
        users: userViewSelector,
      },
    },
    toRelations: {
      include: {
        toUser: userViewSelector,
      },
    },

    fromProducts: true,
    toProducts: true,
    bills: true,
  },
})
export type MyUser = UserGetPayload<typeof myUserSlice>
