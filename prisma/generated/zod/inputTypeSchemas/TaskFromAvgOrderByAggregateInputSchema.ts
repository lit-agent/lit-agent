import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskFromAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TaskFromAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskFromAvgOrderByAggregateInputSchema;
