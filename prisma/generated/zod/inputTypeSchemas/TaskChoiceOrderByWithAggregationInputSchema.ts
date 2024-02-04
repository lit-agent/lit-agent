import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { TaskChoiceCountOrderByAggregateInputSchema } from './TaskChoiceCountOrderByAggregateInputSchema';
import { TaskChoiceMaxOrderByAggregateInputSchema } from './TaskChoiceMaxOrderByAggregateInputSchema';
import { TaskChoiceMinOrderByAggregateInputSchema } from './TaskChoiceMinOrderByAggregateInputSchema';

export const TaskChoiceOrderByWithAggregationInputSchema: z.ZodType<Prisma.TaskChoiceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  taskFromId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => TaskChoiceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TaskChoiceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TaskChoiceMinOrderByAggregateInputSchema).optional()
}).strict();

export default TaskChoiceOrderByWithAggregationInputSchema;
