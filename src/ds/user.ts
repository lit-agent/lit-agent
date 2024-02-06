import { Prisma } from "@prisma/client"
import UserGetPayload = Prisma.UserGetPayload
import validator = Prisma.validator
import UserDefaultArgs = Prisma.UserDefaultArgs

export type BaseClientUser = UserGetPayload<{
  select: {
    id: true
    name: true
    image: true
    type: true
  }
}>

export const userSlice = validator<UserDefaultArgs>()({
  include: {
    honors: true,
    fromTasks: true,
    rooms: {
      include: {
        messages: {
          include: {
            fromUser: true,
          },
        },
        users: true,
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
export type MyUser = UserGetPayload<typeof userSlice>
