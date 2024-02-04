import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { AccountOrderByRelationAggregateInputSchema } from './AccountOrderByRelationAggregateInputSchema';
import { SessionOrderByRelationAggregateInputSchema } from './SessionOrderByRelationAggregateInputSchema';
import { HonorOrderByRelationAggregateInputSchema } from './HonorOrderByRelationAggregateInputSchema';
import { RoomOrderByRelationAggregateInputSchema } from './RoomOrderByRelationAggregateInputSchema';
import { MessageOrderByRelationAggregateInputSchema } from './MessageOrderByRelationAggregateInputSchema';
import { TaskFromOrderByRelationAggregateInputSchema } from './TaskFromOrderByRelationAggregateInputSchema';
import { TaskToOrderByRelationAggregateInputSchema } from './TaskToOrderByRelationAggregateInputSchema';
import { ProductFromOrderByRelationAggregateInputSchema } from './ProductFromOrderByRelationAggregateInputSchema';
import { ProductToOrderByRelationAggregateInputSchema } from './ProductToOrderByRelationAggregateInputSchema';
import { BillOrderByRelationAggregateInputSchema } from './BillOrderByRelationAggregateInputSchema';
import { TaskChoiceOrderByWithRelationInputSchema } from './TaskChoiceOrderByWithRelationInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phoneVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  validated: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  currentBalance: z.lazy(() => SortOrderSchema).optional(),
  historyBalance: z.lazy(() => SortOrderSchema).optional(),
  taskChoiceId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  honors: z.lazy(() => HonorOrderByRelationAggregateInputSchema).optional(),
  rooms: z.lazy(() => RoomOrderByRelationAggregateInputSchema).optional(),
  sentMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  receivedMessages: z.lazy(() => MessageOrderByRelationAggregateInputSchema).optional(),
  fromTasks: z.lazy(() => TaskFromOrderByRelationAggregateInputSchema).optional(),
  toTasks: z.lazy(() => TaskToOrderByRelationAggregateInputSchema).optional(),
  fromProducts: z.lazy(() => ProductFromOrderByRelationAggregateInputSchema).optional(),
  toProducts: z.lazy(() => ProductToOrderByRelationAggregateInputSchema).optional(),
  bills: z.lazy(() => BillOrderByRelationAggregateInputSchema).optional(),
  TaskChoice: z.lazy(() => TaskChoiceOrderByWithRelationInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
