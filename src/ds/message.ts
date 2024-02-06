import { z } from "zod"
import { createRequirementBodySchema } from "@/ds/requirement"
import { Prisma } from ".prisma/client"
import validator = Prisma.validator
import MessageDefaultArgs = Prisma.MessageDefaultArgs
import MessageGetPayload = Prisma.MessageGetPayload

export type IMessageBody = z.infer<typeof createRequirementBodySchema>
export const sendMessageSchema = z.object({
  roomId: z.string(),
  body: createRequirementBodySchema,
})

export const clientMessageSlice = validator<MessageDefaultArgs>()({
  include: {
    fromUser: true,
    room: {
      include: {
        task: true,
      },
    },
  },
})
export type ClientMessage = MessageGetPayload<typeof clientMessageSlice>
