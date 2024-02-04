import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedOneWithoutSentMessagesInputSchema } from './UserCreateNestedOneWithoutSentMessagesInputSchema';
import { RoomCreateNestedOneWithoutMessagesInputSchema } from './RoomCreateNestedOneWithoutMessagesInputSchema';
import { TaskFromCreateNestedOneWithoutMessagesInputSchema } from './TaskFromCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutToUsersInputSchema: z.ZodType<Prisma.MessageCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutSentMessagesInputSchema),
  room: z.lazy(() => RoomCreateNestedOneWithoutMessagesInputSchema).optional(),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutToUsersInputSchema;
