import { z } from "zod"
import { createRequirementBodySchema } from "@/ds/requirement"

import { IUserView } from "@/ds/user.base"
import { getChatId } from "@/lib/socket"
import { IMessageView } from "@/ds/message.base"

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

export const getClientMessageId = (message: IMessageView) =>
  message.room?.id ?? getChatId(message.fromUser.id, message.toUser!.id)

export type IChatView = {
  message: IMessageView
  unreadCount: number

  roomId?: string
  users?: IUserView[] // 群

  targetUser?: IUserView // 个人
}
