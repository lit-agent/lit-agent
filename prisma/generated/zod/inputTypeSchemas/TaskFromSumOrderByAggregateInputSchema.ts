import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskFromSumOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskFromSumOrderByAggregateInputSchema;
