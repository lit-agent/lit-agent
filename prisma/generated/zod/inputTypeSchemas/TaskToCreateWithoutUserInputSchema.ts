import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { TaskFromCreateNestedOneWithoutToUsersInputSchema } from './TaskFromCreateNestedOneWithoutToUsersInputSchema';

export const TaskToCreateWithoutUserInputSchema: z.ZodType<Prisma.TaskToCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  status: z.lazy(() => TaskToStatusSchema),
  task: z.lazy(() => TaskFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export default TaskToCreateWithoutUserInputSchema;
