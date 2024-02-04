import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromWhereInputSchema } from '../inputTypeSchemas/TaskFromWhereInputSchema'

export const TaskFromDeleteManyArgsSchema: z.ZodType<Prisma.TaskFromDeleteManyArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
}).strict()

export default TaskFromDeleteManyArgsSchema;
