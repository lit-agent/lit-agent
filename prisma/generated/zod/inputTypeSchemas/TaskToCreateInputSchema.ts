import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { UserCreateNestedOneWithoutToTasksInputSchema } from './UserCreateNestedOneWithoutToTasksInputSchema';
import { TaskFromCreateNestedOneWithoutToUsersInputSchema } from './TaskFromCreateNestedOneWithoutToUsersInputSchema';

export const TaskToCreateInputSchema: z.ZodType<Prisma.TaskToCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutToTasksInputSchema),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export default TaskToCreateInputSchema;
