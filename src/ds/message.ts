import { z } from "zod"
import { createRequirementBodySchema } from "@/ds/requirement"
import { Prisma } from "@prisma/client"
import validator = Prisma.validator
import MessageDefaultArgs = Prisma.MessageDefaultArgs
import MessageGetPayload = Prisma.MessageGetPayload

import { clientUserSlice } from "@/ds/user.base"
import { getChatId } from "@/lib/socket"

export const selectChatTarget = z.object({
  roomId: z.string().optional(),
  toUserId: z.string().optional(),
})

export type ISelectChatTarget = z.infer<typeof selectChatTarget>

export const sendMessageSchema = z
  .object({
    body: createRequirementBodySchema,
    mentions: z.array(z.string()).optional(),
  })
  .and(selectChatTarget)

export type IMessageBody = z.infer<typeof createRequirementBodySchema>

export const clientMessageSlice = validator<MessageDefaultArgs>()({
  select: {
    body: true,
    fromUser: clientUserSlice,
    toUser: clientUserSlice,
    room: {
      select: {
        id: true,
        users: clientUserSlice,
        task: {
          select: {
            id: true,
          },
        },
      },
    },
  },
})
export type IClientMessage = MessageGetPayload<typeof clientMessageSlice> & {
  read?: boolean
}

export const getClientMessageId = (message: IClientMessage) =>
  message.room?.id ?? getChatId(message.fromUser.id, message.toUser!.id)
