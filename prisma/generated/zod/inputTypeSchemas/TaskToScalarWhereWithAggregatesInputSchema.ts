import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { EnumTaskToStatusWithAggregatesFilterSchema } from './EnumTaskToStatusWithAggregatesFilterSchema';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const TaskToScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TaskToScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema),z.lazy(() => TaskToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusWithAggregatesFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
}).strict();

export default TaskToScalarWhereWithAggregatesInputSchema;
