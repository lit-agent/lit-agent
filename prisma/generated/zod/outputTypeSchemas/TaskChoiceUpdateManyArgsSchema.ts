import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceUpdateManyMutationInputSchema } from '../inputTypeSchemas/TaskChoiceUpdateManyMutationInputSchema'
import { TaskChoiceUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TaskChoiceUncheckedUpdateManyInputSchema'
import { TaskChoiceWhereInputSchema } from '../inputTypeSchemas/TaskChoiceWhereInputSchema'

export const TaskChoiceUpdateManyArgsSchema: z.ZodType<Prisma.TaskChoiceUpdateManyArgs> = z.object({
  data: z.union([ TaskChoiceUpdateManyMutationInputSchema,TaskChoiceUncheckedUpdateManyInputSchema ]),
  where: TaskChoiceWhereInputSchema.optional(),
}).strict()

export default TaskChoiceUpdateManyArgsSchema;
