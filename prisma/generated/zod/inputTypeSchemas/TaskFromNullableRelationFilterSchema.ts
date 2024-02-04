import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskFromNullableRelationFilterSchema: z.ZodType<Prisma.TaskFromNullableRelationFilter> = z.object({
  is: z.lazy(() => TaskFromWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TaskFromWhereInputSchema).optional().nullable()
}).strict();

export default TaskFromNullableRelationFilterSchema;
