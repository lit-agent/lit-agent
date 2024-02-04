import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { TaskToOrderByRelationAggregateInputSchema } from './TaskToOrderByRelationAggregateInputSchema';
import { MessageOrderByRelationAggregateInputSchema } from './MessageOrderByRelationAggregateInputSchema';
import { TaskChoiceOrderByRelationAggregateInputSchema } from './TaskChoiceOrderByRelationAggregateInputSchema';

export const TaskFromOrderByWithRelationInputSchema: z.ZodType<Prisma.TaskFromOrderByWithRelationInput> = z.object({
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
  fromUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  toUsers: z.lazy(() => TaskToOrderByRelationAggregateInputSchema).optional(),
  messages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  choices: z.lazy(() => TaskChoiceOrderByRelationAggregateInputSchema).optional()
}).strict();

export default TaskFromOrderByWithRelationInputSchema;
