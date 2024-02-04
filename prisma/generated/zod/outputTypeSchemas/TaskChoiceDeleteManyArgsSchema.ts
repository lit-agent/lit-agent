import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceWhereInputSchema } from '../inputTypeSchemas/TaskChoiceWhereInputSchema'

export const TaskChoiceDeleteManyArgsSchema: z.ZodType<Prisma.TaskChoiceDeleteManyArgs> = z.object({
  where: TaskChoiceWhereInputSchema.optional(),
}).strict()

export default TaskChoiceDeleteManyArgsSchema;
