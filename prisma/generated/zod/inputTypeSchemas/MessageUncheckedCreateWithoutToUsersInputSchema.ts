import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';

export const MessageUncheckedCreateWithoutToUsersInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  fromUserId: z.string(),
  roomId: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  taskFromId: z.string().optional().nullable()
}).strict();

export default MessageUncheckedCreateWithoutToUsersInputSchema;
