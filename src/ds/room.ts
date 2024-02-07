import { userViewSelector } from "@/ds/user.base"
import { messageViewSelector } from "@/ds/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import RoomDefaultArgs = Prisma.RoomDefaultArgs
import RoomGetPayload = Prisma.RoomGetPayload

export const roomViewSelector = validator<RoomDefaultArgs>()({
  select: {
    id: true,
    users: userViewSelector,
    messages: messageViewSelector,
  },
})
export type IRoomView = RoomGetPayload<typeof roomViewSelector>
