import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { EnumTaskChoiceTypeFieldUpdateOperationsInputSchema } from './EnumTaskChoiceTypeFieldUpdateOperationsInputSchema';
import { UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema } from './UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema';

export const TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedUpdateWithoutTaskFromInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => EnumTaskChoiceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema).optional()
}).strict();

export default TaskChoiceUncheckedUpdateWithoutTaskFromInputSchema;
