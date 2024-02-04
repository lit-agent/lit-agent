import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskTypeFilterSchema } from './EnumTaskTypeFilterSchema';
import { TaskTypeSchema } from './TaskTypeSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumTaskStatusFilterSchema } from './EnumTaskStatusFilterSchema';
import { TaskStatusSchema } from './TaskStatusSchema';

export const TaskFromScalarWhereInputSchema: z.ZodType<Prisma.TaskFromScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromScalarWhereInputSchema),z.lazy(() => TaskFromScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskTypeFilterSchema),z.lazy(() => TaskTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  startTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endTime: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskStatusFilterSchema),z.lazy(() => TaskStatusSchema) ]).optional(),
}).strict();

export default TaskFromScalarWhereInputSchema;
