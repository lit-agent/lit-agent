import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToUpdateManyMutationInputSchema } from '../inputTypeSchemas/TaskToUpdateManyMutationInputSchema'
import { TaskToUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TaskToUncheckedUpdateManyInputSchema'
import { TaskToWhereInputSchema } from '../inputTypeSchemas/TaskToWhereInputSchema'

export const TaskToUpdateManyArgsSchema: z.ZodType<Prisma.TaskToUpdateManyArgs> = z.object({
  data: z.union([ TaskToUpdateManyMutationInputSchema,TaskToUncheckedUpdateManyInputSchema ]),
  where: TaskToWhereInputSchema.optional(),
}).strict()

export default TaskToUpdateManyArgsSchema;
