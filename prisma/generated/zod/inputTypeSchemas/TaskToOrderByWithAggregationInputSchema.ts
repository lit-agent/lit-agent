import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { TaskToCountOrderByAggregateInputSchema } from './TaskToCountOrderByAggregateInputSchema';
import { TaskToMaxOrderByAggregateInputSchema } from './TaskToMaxOrderByAggregateInputSchema';
import { TaskToMinOrderByAggregateInputSchema } from './TaskToMinOrderByAggregateInputSchema';

export const TaskToOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskToOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskToCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskToMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskToMinOrderByAggregateInputSchema).optional()
}).strict();

export default TaskToOrderByWithAggregationInputSchema;
