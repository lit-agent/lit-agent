import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToIncludeSchema } from '../inputTypeSchemas/TaskToIncludeSchema'
import { TaskToCreateInputSchema } from '../inputTypeSchemas/TaskToCreateInputSchema'
import { TaskToUncheckedCreateInputSchema } from '../inputTypeSchemas/TaskToUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskToSelectSchema: z.ZodType<Prisma.TaskToSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskId: z.boolean().optional(),
  status: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
}).strict()

export const TaskToCreateArgsSchema: z.ZodType<Prisma.TaskToCreateArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  data: z.union([ TaskToCreateInputSchema,TaskToUncheckedCreateInputSchema ]),
}).strict()

export default TaskToCreateArgsSchema;
