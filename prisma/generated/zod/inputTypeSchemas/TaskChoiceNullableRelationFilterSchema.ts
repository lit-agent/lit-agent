import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';

export const TaskChoiceNullableRelationFilterSchema: z.ZodType<Prisma.TaskChoiceNullableRelationFilter> = z.object({
  is: z.lazy(() => TaskChoiceWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => TaskChoiceWhereInputSchema).optional().nullable()
}).strict();

export default TaskChoiceNullableRelationFilterSchema;
