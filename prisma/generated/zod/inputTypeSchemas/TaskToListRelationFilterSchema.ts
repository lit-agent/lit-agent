import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereInputSchema } from './TaskToWhereInputSchema';

export const TaskToListRelationFilterSchema: z.ZodType<Prisma.TaskToListRelationFilter> = z.object({
  every: z.lazy(() => TaskToWhereInputSchema).optional(),
  some: z.lazy(() => TaskToWhereInputSchema).optional(),
  none: z.lazy(() => TaskToWhereInputSchema).optional()
}).strict();

export default TaskToListRelationFilterSchema;
