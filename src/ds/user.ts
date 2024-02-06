import { Prisma } from "@prisma/client"
import { clientMessageSlice } from "@/ds/message"
import { userViewSelector } from "@/ds/user.base"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs

export const myUserSlice = validator<UserDefaultArgs>()({
  include: {
    honors: true,
    fromTasks: true,
    rooms: {
      include: {
        messages: clientMessageSlice,
        users: userViewSelector,
      },
    },
    toRelations: {
      include: {
        toUser: true,
      },
    },
    toTasks: {
      include: {
        task: {
          include: {
            toUsers: true,
            room: {
              include: {
                messages: true,
              },
            },
          },
        },
      },
    },

    fromProducts: true,
    toProducts: true,
    bills: true,
  },
})
export type MyUser = UserGetPayload<typeof myUserSlice>
