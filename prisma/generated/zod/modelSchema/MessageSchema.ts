import { z } from 'zod';
import { MessageTypeSchema } from '../inputTypeSchemas/MessageTypeSchema'

/////////////////////////////////////////
// MESSAGE SCHEMA
/////////////////////////////////////////

export const MessageSchema = z.object({
  type: MessageTypeSchema,
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  text: z.string().nullable(),
  fromUserId: z.string(),
  roomId: z.string().nullable(),
  taskId: z.string().nullable(),
  taskFromId: z.string().nullable(),
})

export type Message = z.infer<typeof MessageSchema>

export default MessageSchema;
