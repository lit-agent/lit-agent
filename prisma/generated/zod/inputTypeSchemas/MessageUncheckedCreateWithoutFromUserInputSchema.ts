import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';
import { UserUncheckedCreateNestedManyWithoutReceivedMessagesInputSchema } from './UserUncheckedCreateNestedManyWithoutReceivedMessagesInputSchema';

export const MessageUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.MessageUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  text: z.string().optional().nullable(),
  roomId: z.string().optional().nullable(),
  type: z.lazy(() => MessageTypeSchema).optional(),
  taskId: z.string().optional().nullable(),
  taskFromId: z.string().optional().nullable(),
  toUsers: z.lazy(() => UserUncheckedCreateNestedManyWithoutReceivedMessagesInputSchema).optional()
}).strict();

export default MessageUncheckedCreateWithoutFromUserInputSchema;
