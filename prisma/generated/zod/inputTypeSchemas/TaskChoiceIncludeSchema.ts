import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
import { TaskChoiceCountOutputTypeArgsSchema } from "../outputTypeSchemas/TaskChoiceCountOutputTypeArgsSchema"

export const TaskChoiceIncludeSchema: z.ZodType<Prisma.TaskChoiceInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  TaskFrom: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskChoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default TaskChoiceIncludeSchema;
