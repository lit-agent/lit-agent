import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { TaskFromCreateNestedOneWithoutChoicesInputSchema } from './TaskFromCreateNestedOneWithoutChoicesInputSchema';

export const TaskChoiceCreateWithoutUsersInputSchema: z.ZodType<Prisma.TaskChoiceCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string(),
  TaskFrom: z.lazy(() => TaskFromCreateNestedOneWithoutChoicesInputSchema).optional()
}).strict();

export default TaskChoiceCreateWithoutUsersInputSchema;
