import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
import { TaskChoiceCountOutputTypeArgsSchema } from "../outputTypeSchemas/TaskChoiceCountOutputTypeArgsSchema"

export const TaskChoiceSelectSchema: z.ZodType<Prisma.TaskChoiceSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  taskFromId: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  TaskFrom: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskChoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default TaskChoiceSelectSchema;
