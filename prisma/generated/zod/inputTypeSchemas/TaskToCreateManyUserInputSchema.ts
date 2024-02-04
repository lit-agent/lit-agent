import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const TaskToCreateManyUserInputSchema: z.ZodType<Prisma.TaskToCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  taskId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export default TaskToCreateManyUserInputSchema;
