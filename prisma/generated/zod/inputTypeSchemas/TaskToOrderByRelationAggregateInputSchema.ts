import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskToOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TaskToOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskToOrderByRelationAggregateInputSchema;
