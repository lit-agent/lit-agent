import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TaskChoiceMinOrderByAggregateInputSchema: z.ZodType<Prisma.TaskChoiceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  taskFromId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TaskChoiceMinOrderByAggregateInputSchema;
