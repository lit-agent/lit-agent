import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToSelectSchema } from '../inputTypeSchemas/TaskToSelectSchema';
import { TaskToIncludeSchema } from '../inputTypeSchemas/TaskToIncludeSchema';

export const TaskToArgsSchema: z.ZodType<Prisma.TaskToDefaultArgs> = z.object({
  select: z.lazy(() => TaskToSelectSchema).optional(),
  include: z.lazy(() => TaskToIncludeSchema).optional(),
}).strict();

export default TaskToArgsSchema;
