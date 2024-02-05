import { Prisma } from "@prisma/client"
import UserGetPayload = Prisma.UserGetPayload
import MessageGetPayload = Prisma.MessageGetPayload
import validator = Prisma.validator
import MessageDefaultArgs = Prisma.MessageDefaultArgs
import UserDefaultArgs = Prisma.UserDefaultArgs

export type BaseClientUser = UserGetPayload<{
  select: {
    id: true
    name: true
    image: true
    type: true
  }
}>

export const clientMessageSlice = validator<MessageDefaultArgs>()({
  include: {
    fromUser: true,
    task: {
      include: {
        choices: true,
      },
    },
  },
})

export type ClientMessage = MessageGetPayload<typeof clientMessageSlice>

export const userSlice = validator<UserDefaultArgs>()({
  include: {
    honors: true,
    fromTasks: true,
    following: {
      include: {
        followedBy: true,
      },
    },
    followedBy: {
      include: {
        following: true,
      },
    },
    toTasks: {
      include: {
        task: {
          include: {
            toUsers: true,
            messages: true,
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
