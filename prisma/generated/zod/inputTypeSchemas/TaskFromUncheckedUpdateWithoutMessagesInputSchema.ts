import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { TaskTypeSchema } from './TaskTypeSchema';
import { EnumTaskTypeFieldUpdateOperationsInputSchema } from './EnumTaskTypeFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { EnumTaskStatusFieldUpdateOperationsInputSchema } from './EnumTaskStatusFieldUpdateOperationsInputSchema';
import { TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema } from './TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema';
import { TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInputSchema } from './TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInputSchema';

export const TaskFromUncheckedUpdateWithoutMessagesInputSchema: z.ZodType<Prisma.TaskFromUncheckedUpdateWithoutMessagesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => EnumTaskTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  startTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endTime: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  fromUserId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskStatusSchema),z.lazy(() => EnumTaskStatusFieldUpdateOperationsInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToUncheckedUpdateManyWithoutTaskNestedInputSchema).optional(),
  choices: z.lazy(() => TaskChoiceUncheckedUpdateManyWithoutTaskFromNestedInputSchema).optional()
}).strict();

export default TaskFromUncheckedUpdateWithoutMessagesInputSchema;
