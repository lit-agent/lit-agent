import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema } from './UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema';

export const TaskChoiceUncheckedCreateWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceUncheckedCreateWithoutTaskFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutTaskChoiceInputSchema).optional()
}).strict();

export default TaskChoiceUncheckedCreateWithoutTaskFromInputSchema;
