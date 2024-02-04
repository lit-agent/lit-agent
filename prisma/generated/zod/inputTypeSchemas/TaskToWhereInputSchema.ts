import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskToStatusFilterSchema } from './EnumTaskToStatusFilterSchema';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TaskFromRelationFilterSchema } from './TaskFromRelationFilterSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskToWhereInputSchema: z.ZodType<Prisma.TaskToWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskFromRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
}).strict();

export default TaskToWhereInputSchema;
