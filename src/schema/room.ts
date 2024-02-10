import { userListViewSchema } from "@/schema/user.base"
import { messageViewSchema } from "@/schema/message.base"

import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import RoomDefaultArgs = Prisma.RoomDefaultArgs
import RoomGetPayload = Prisma.RoomGetPayload

export const roomViewSelector = validator<RoomDefaultArgs>()({
  select: {
    id: true,
    users: userListViewSchema,
    messages: messageViewSchema,
  },
})
export type IRoomView = RoomGetPayload<typeof roomViewSelector>
