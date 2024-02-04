import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema } from './UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema';

export const TaskChoiceUncheckedCreateInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  taskFromId: z.string().optional().nullable(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema).optional()
}).strict();

export default TaskChoiceUncheckedCreateInputSchema;
