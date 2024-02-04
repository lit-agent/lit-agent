import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToWhereInputSchema } from '../inputTypeSchemas/TaskToWhereInputSchema'

export const TaskToDeleteManyArgsSchema: z.ZodType<Prisma.TaskToDeleteManyArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
}).strict()

export default TaskToDeleteManyArgsSchema;
