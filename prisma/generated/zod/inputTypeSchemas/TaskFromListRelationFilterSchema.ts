import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromListRelationFilterSchema: z.ZodType<Prisma.TaskFromListRelationFilter> = z.object({
  every: z.lazy(() => TaskFromWhereInputSchema).optional(),
  some: z.lazy(() => TaskFromWhereInputSchema).optional(),
  none: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export default TaskFromListRelationFilterSchema;
