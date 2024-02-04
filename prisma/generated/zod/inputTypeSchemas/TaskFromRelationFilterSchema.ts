import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromRelationFilterSchema: z.ZodType<Prisma.TaskFromRelationFilter> = z.object({
  is: z.lazy(() => TaskFromWhereInputSchema).optional(),
  isNot: z.lazy(() => TaskFromWhereInputSchema).optional()
}).strict();

export default TaskFromRelationFilterSchema;
