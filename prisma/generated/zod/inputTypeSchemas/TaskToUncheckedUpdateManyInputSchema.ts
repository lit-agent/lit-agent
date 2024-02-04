import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { EnumTaskToStatusFieldUpdateOperationsInputSchema } from './EnumTaskToStatusFieldUpdateOperationsInputSchema';

export const TaskToUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TaskToUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => EnumTaskToStatusFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default TaskToUncheckedUpdateManyInputSchema;
