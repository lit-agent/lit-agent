import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromCreateManyInputSchema } from '../inputTypeSchemas/TaskFromCreateManyInputSchema'

export const TaskFromCreateManyArgsSchema: z.ZodType<Prisma.TaskFromCreateManyArgs> = z.object({
  data: z.union([ TaskFromCreateManyInputSchema,TaskFromCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default TaskFromCreateManyArgsSchema;
