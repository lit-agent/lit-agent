import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';

export const TaskChoiceListRelationFilterSchema: z.ZodType<Prisma.TaskChoiceListRelationFilter> = z.object({
  every: z.lazy(() => TaskChoiceWhereInputSchema).optional(),
  some: z.lazy(() => TaskChoiceWhereInputSchema).optional(),
  none: z.lazy(() => TaskChoiceWhereInputSchema).optional()
}).strict();

export default TaskChoiceListRelationFilterSchema;
