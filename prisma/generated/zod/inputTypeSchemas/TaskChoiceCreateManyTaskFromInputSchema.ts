import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';

export const TaskChoiceCreateManyTaskFromInputSchema: z.ZodType<Prisma.TaskChoiceCreateManyTaskFromInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  type: z.lazy(() => TaskChoiceTypeSchema),
  content: z.string()
}).strict();

export default TaskChoiceCreateManyTaskFromInputSchema;
