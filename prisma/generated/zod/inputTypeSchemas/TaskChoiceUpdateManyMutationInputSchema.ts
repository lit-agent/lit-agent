import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { EnumTaskChoiceTypeFieldUpdateOperationsInputSchema } from './EnumTaskChoiceTypeFieldUpdateOperationsInputSchema';

export const TaskChoiceUpdateManyMutationInputSchema: z.ZodType<Prisma.TaskChoiceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => EnumTaskChoiceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default TaskChoiceUpdateManyMutationInputSchema;
