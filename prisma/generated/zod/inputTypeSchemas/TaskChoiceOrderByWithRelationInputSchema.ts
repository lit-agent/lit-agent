import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByRelationAggregateInputSchema } from './UserOrderByRelationAggregateInputSchema';
import { TaskFromOrderByWithRelationInputSchema } from './TaskFromOrderByWithRelationInputSchema';

export const TaskChoiceOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskChoiceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  taskFromId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  TaskFrom: z.lazy(() => TaskFromOrderByWithRelationInputSchema).optional()
}).strict();

export default TaskChoiceOrderByWithRelationInputSchema;
