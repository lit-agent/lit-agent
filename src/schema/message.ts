import { z } from "zod"

import { getChatId } from "@/lib/socket/helpers"
import { createRequirementBodySchema } from "./requirement"
import { IMessageView } from "./message.base"
import { IUserListView } from "./user.base"

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
  users?: IUserListView[] // 群

  targetUser?: IUserListView // 个人
}
