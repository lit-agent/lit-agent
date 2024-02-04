import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { UserCreateNestedManyWithoutReceivedMessagesInputSchema } from './UserCreateNestedManyWithoutReceivedMessagesInputSchema';
import { RoomCreateNestedOneWithoutMessagesInputSchema } from './RoomCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutTaskInputSchema: z.ZodType<Prisma.MessageCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  toUsers: z.lazy(() => UserCreateNestedManyWithoutReceivedMessagesInputSchema).optional(),
  room: z.lazy(() => RoomCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutTaskInputSchema;
