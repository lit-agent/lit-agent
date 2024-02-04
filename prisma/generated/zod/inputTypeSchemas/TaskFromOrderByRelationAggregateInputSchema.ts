import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskFromOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskFromOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskFromOrderByRelationAggregateInputSchema;
