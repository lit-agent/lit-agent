import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { UserCreateNestedOneWithoutToTasksInputSchema } from './UserCreateNestedOneWithoutToTasksInputSchema';

export const TaskToCreateWithoutTaskInputSchema: z.ZodType<Prisma.TaskToCreateWithoutTaskInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutToTasksInputSchema)
}).strict();

export default TaskToCreateWithoutTaskInputSchema;
