import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromSelectSchema } from '../inputTypeSchemas/TaskFromSelectSchema';
import { TaskFromIncludeSchema } from '../inputTypeSchemas/TaskFromIncludeSchema';

export const TaskFromArgsSchema: z.ZodType<Prisma.TaskFromDefaultArgs> = z.object({
  select: z.lazy(() => TaskFromSelectSchema).optional(),
  include: z.lazy(() => TaskFromIncludeSchema).optional(),
}).strict();

export default TaskFromArgsSchema;
