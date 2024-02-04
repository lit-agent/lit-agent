import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserCreateNestedManyWithoutReceivedMessagesInputSchema } from './UserCreateNestedManyWithoutReceivedMessagesInputSchema';
import { RoomCreateNestedOneWithoutMessagesInputSchema } from './RoomCreateNestedOneWithoutMessagesInputSchema';
import { TaskFromCreateNestedOneWithoutMessagesInputSchema } from './TaskFromCreateNestedOneWithoutMessagesInputSchema';

export const MessageCreateWithoutFromUserInputSchema: z.ZodType<Prisma.MessageCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  toUsers: z.lazy(() => UserCreateNestedManyWithoutReceivedMessagesInputSchema).optional(),
  room: z.lazy(() => RoomCreateNestedOneWithoutMessagesInputSchema).optional(),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutMessagesInputSchema).optional()
}).strict();

export default MessageCreateWithoutFromUserInputSchema;
