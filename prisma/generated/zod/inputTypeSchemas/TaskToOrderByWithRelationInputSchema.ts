import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { TaskFromOrderByWithRelationInputSchema } from './TaskFromOrderByWithRelationInputSchema';

export const TaskToOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskToOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  taskId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  task: z.lazy(() => TaskFromOrderByWithRelationInputSchema).optional()
}).strict();

export default TaskToOrderByWithRelationInputSchema;
