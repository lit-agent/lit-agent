import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { TaskFromCountOrderByAggregateInputSchema } from './TaskFromCountOrderByAggregateInputSchema';
import { TaskFromAvgOrderByAggregateInputSchema } from './TaskFromAvgOrderByAggregateInputSchema';
import { TaskFromMaxOrderByAggregateInputSchema } from './TaskFromMaxOrderByAggregateInputSchema';
import { TaskFromMinOrderByAggregateInputSchema } from './TaskFromMinOrderByAggregateInputSchema';
import { TaskFromSumOrderByAggregateInputSchema } from './TaskFromSumOrderByAggregateInputSchema';

export const TaskFromOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskFromOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  startTime: z.lazy(() => SortOrderSchema).optional(),
  endTime: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TaskFromCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => TaskFromAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskFromMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskFromMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => TaskFromSumOrderByAggregateInputSchema).optional()
}).strict();

export default TaskFromOrderByWithAggregationInputSchema;
