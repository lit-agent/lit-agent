import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskTypeSchema } from './TaskTypeSchema';
import { TaskStatusSchema } from './TaskStatusSchema';

export const TaskFromCreateManyInputSchema: z.ZodType<Prisma.TaskFromCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => TaskTypeSchema),
  content: z.string(),
  value: z.number().int(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date(),
  fromUserId: z.string(),
  status: z.lazy(() => TaskStatusSchema)
}).strict();

export default TaskFromCreateManyInputSchema;
