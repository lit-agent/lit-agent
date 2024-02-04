import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskFromWhereInputSchema } from './TaskFromWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumTaskTypeFilterSchema } from './EnumTaskTypeFilterSchema';
import { TaskTypeSchema } from './TaskTypeSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { EnumTaskStatusFilterSchema } from './EnumTaskStatusFilterSchema';
import { TaskStatusSchema } from './TaskStatusSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { TaskToListRelationFilterSchema } from './TaskToListRelationFilterSchema';
import { MessageListRelationFilterSchema } from './MessageListRelationFilterSchema';
import { TaskChoiceListRelationFilterSchema } from './TaskChoiceListRelationFilterSchema';

export const TaskFromWhereUniqueInputSchema: z.ZodType<Prisma.TaskFromWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TaskFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TaskFromWhereInputSchema),z.lazy(() => TaskFromWhereInputSchema).array() ]).optional(),
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
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => TaskToListRelationFilterSchema).optional(),
  messages: z.lazy(() => MessageListRelationFilterSchema).optional(),
  choices: z.lazy(() => TaskChoiceListRelationFilterSchema).optional()
}).strict());

export default TaskFromWhereUniqueInputSchema;
