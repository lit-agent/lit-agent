import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToWhereInputSchema } from './TaskToWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumTaskToStatusFilterSchema } from './EnumTaskToStatusFilterSchema';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TaskFromRelationFilterSchema } from './TaskFromRelationFilterSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskToWhereUniqueInputSchema: z.ZodType<Prisma.TaskToWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskToWhereInputSchema),z.lazy(() => TaskToWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumTaskToStatusFilterSchema),z.lazy(() => TaskToStatusSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  task: z.union([ z.lazy(() => TaskFromRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional(),
}).strict());

export default TaskToWhereUniqueInputSchema;
