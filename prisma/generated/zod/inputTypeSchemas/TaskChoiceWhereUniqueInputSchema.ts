import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceWhereInputSchema } from './TaskChoiceWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskChoiceTypeFilterSchema } from './EnumTaskChoiceTypeFilterSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';
import { TaskFromNullableRelationFilterSchema } from './TaskFromNullableRelationFilterSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskChoiceWhereUniqueInputSchema: z.ZodType<Prisma.TaskChoiceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskChoiceWhereInputSchema),z.lazy(() => TaskChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskChoiceWhereInputSchema),z.lazy(() => TaskChoiceWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskChoiceTypeFilterSchema),z.lazy(() => TaskChoiceTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskFromId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  TaskFrom: z.union([ z.lazy(() => TaskFromNullableRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional().nullable(),
}).strict());

export default TaskChoiceWhereUniqueInputSchema;
