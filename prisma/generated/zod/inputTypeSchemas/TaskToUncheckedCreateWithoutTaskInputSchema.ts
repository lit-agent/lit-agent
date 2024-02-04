import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const TaskToUncheckedCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToUncheckedCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  status: z.lazy(() => TaskToStatusSchema)
}).strict();

export default TaskToUncheckedCreateWithoutTaskInputSchema;
