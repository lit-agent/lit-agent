import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { UserCreateNestedManyWithoutReceivedMessagesInputSchema } from './UserCreateNestedManyWithoutReceivedMessagesInputSchema';
import { TaskFromCreateNestedOneWithoutMessagesInputSchema } from './TaskFromCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutRoomInputSchema: z.ZodType<Prisma.MessageCreateWithoutRoomInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  toUsers: z.lazy(() => UserCreateNestedManyWithoutReceivedMessagesInputSchema).optional(),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutRoomInputSchema;
