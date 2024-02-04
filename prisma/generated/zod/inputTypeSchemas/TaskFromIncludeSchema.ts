import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TaskToFindManyArgsSchema } from "../outputTypeSchemas/TaskToFindManyArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { TaskChoiceFindManyArgsSchema } from "../outputTypeSchemas/TaskChoiceFindManyArgsSchema"
import { TaskFromCountOutputTypeArgsSchema } from "../outputTypeSchemas/TaskFromCountOutputTypeArgsSchema"

export const TaskFromIncludeSchema: z.ZodType<Prisma.TaskFromInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  choices: z.union([z.boolean(),z.lazy(() => TaskChoiceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default TaskFromIncludeSchema;
