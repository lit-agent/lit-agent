import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromWhereInputSchema } from '../inputTypeSchemas/TaskFromWhereInputSchema'
import { TaskFromOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskFromOrderByWithRelationInputSchema'
import { TaskFromWhereUniqueInputSchema } from '../inputTypeSchemas/TaskFromWhereUniqueInputSchema'

export const TaskFromAggregateArgsSchema: z.ZodType<Prisma.TaskFromAggregateArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskFromAggregateArgsSchema;
