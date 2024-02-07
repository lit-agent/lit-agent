import { userListViewSchema } from "@/schema/user.base"
import { messageViewSelector } from "@/schema/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import RoomDefaultArgs = Prisma.RoomDefaultArgs
import RoomGetPayload = Prisma.RoomGetPayload

export const roomViewSelector = validator<RoomDefaultArgs>()({
  select: {
    id: true,
    users: userListViewSchema,
    messages: messageViewSelector,
  },
})
export type IRoomView = RoomGetPayload<typeof roomViewSelector>
