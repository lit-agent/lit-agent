import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { EnumTaskChoiceTypeFilterSchema } from './EnumTaskChoiceTypeFilterSchema';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';
import { TaskFromNullableRelationFilterSchema } from './TaskFromNullableRelationFilterSchema';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';

export const TaskChoiceWhereInputSchema: z.ZodType<Prisma.TaskChoiceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TaskChoiceWhereInputSchema),z.lazy(() => TaskChoiceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskChoiceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskChoiceWhereInputSchema),z.lazy(() => TaskChoiceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  type: z.union([ z.lazy(() => EnumTaskChoiceTypeFilterSchema),z.lazy(() => TaskChoiceTypeSchema) ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  taskFromId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  TaskFrom: z.union([ z.lazy(() => TaskFromNullableRelationFilterSchema),z.lazy(() => TaskFromWhereInputSchema) ]).optional().nullable(),
}).strict();

export default TaskChoiceWhereInputSchema;
