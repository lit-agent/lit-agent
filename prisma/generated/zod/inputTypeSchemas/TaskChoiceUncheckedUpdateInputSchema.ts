import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { EnumTaskChoiceTypeFieldUpdateOperationsInputSchema } from './EnumTaskChoiceTypeFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema } from './UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema';

export const TaskChoiceUncheckedUpdateInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => EnumTaskChoiceTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  taskFromId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutTaskChoiceNestedInputSchema).optional()
}).strict();

export default TaskChoiceUncheckedUpdateInputSchema;
