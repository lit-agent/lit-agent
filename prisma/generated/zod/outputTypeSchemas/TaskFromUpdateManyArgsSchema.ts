import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromUpdateManyMutationInputSchema } from '../inputTypeSchemas/TaskFromUpdateManyMutationInputSchema'
import { TaskFromUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TaskFromUncheckedUpdateManyInputSchema'
import { TaskFromWhereInputSchema } from '../inputTypeSchemas/TaskFromWhereInputSchema'

export const TaskFromUpdateManyArgsSchema: z.ZodType<Prisma.TaskFromUpdateManyArgs> = z.object({
  data: z.union([ TaskFromUpdateManyMutationInputSchema,TaskFromUncheckedUpdateManyInputSchema ]),
  where: TaskFromWhereInputSchema.optional(),
}).strict()

export default TaskFromUpdateManyArgsSchema;
