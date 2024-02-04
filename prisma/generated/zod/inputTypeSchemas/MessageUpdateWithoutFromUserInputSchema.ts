import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { MessageTypeSchema } from './MessageTypeSchema';
import { EnumMessageTypeFieldUpdateOperationsInputSchema } from './EnumMessageTypeFieldUpdateOperationsInputSchema';
import { UserUpdateManyWithoutReceivedMessagesNestedInputSchema } from './UserUpdateManyWithoutReceivedMessagesNestedInputSchema';
import { RoomUpdateOneWithoutMessagesNestedInputSchema } from './RoomUpdateOneWithoutMessagesNestedInputSchema';
import { TaskFromUpdateOneWithoutMessagesNestedInputSchema } from './TaskFromUpdateOneWithoutMessagesNestedInputSchema';

export const MessageUpdateWithoutFromUserInputSchema: z.ZodType<Prisma.MessageUpdateWithoutFromUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  type: z.union([ z.lazy(() => MessageTypeSchema),z.lazy(() => EnumMessageTypeFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  toUsers: z.lazy(() => UserUpdateManyWithoutReceivedMessagesNestedInputSchema).optional(),
  room: z.lazy(() => RoomUpdateOneWithoutMessagesNestedInputSchema).optional(),
  task: z.lazy(() => TaskFromUpdateOneWithoutMessagesNestedInputSchema).optional()
}).strict();

export default MessageUpdateWithoutFromUserInputSchema;
