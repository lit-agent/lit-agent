import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToCreateManyInputSchema } from '../inputTypeSchemas/TaskToCreateManyInputSchema'

export const TaskToCreateManyArgsSchema: z.ZodType<Prisma.TaskToCreateManyArgs> = z.object({
  data: z.union([ TaskToCreateManyInputSchema,TaskToCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default TaskToCreateManyArgsSchema;
