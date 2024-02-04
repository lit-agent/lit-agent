import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { EnumTaskTypeWithAggregatesFilterSchema } from './EnumTaskTypeWithAggregatesFilterSchema';
import { TaskTypeSchema } from './TaskTypeSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { EnumTaskStatusWithAggregatesFilterSchema } from './EnumTaskStatusWithAggregatesFilterSchema';
import { TaskStatusSchema } from './TaskStatusSchema';

export const TaskFromScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskFromScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskFromScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeWithAggregatesFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusWithAggregatesFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
}).strict();

export default TaskFromScalarWhereWithAggregatesInputSchema;
