import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceCreateManyInputSchema } from '../inputTypeSchemas/TaskChoiceCreateManyInputSchema'

export const TaskChoiceCreateManyArgsSchema: z.ZodType<Prisma.TaskChoiceCreateManyArgs> = z.object({
  data: z.union([ TaskChoiceCreateManyInputSchema,TaskChoiceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default TaskChoiceCreateManyArgsSchema;
