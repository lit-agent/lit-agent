import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { UserCreateNestedManyWithoutTaskChoiceInputSchema } from './UserCreateNestedManyWithoutTaskChoiceInputSchema';

export const TaskChoiceCreateWithoutTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceCreateWithoutTaskFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  users: z.lazy(() => UserCreateNestedManyWithoutTaskChoiceInputSchema).optional()
}).strict();

export default TaskChoiceCreateWithoutTaskFromInputSchema;
