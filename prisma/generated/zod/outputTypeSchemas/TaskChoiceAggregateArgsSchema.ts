import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceWhereInputSchema } from '../inputTypeSchemas/TaskChoiceWhereInputSchema'
import { TaskChoiceOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskChoiceOrderByWithRelationInputSchema'
import { TaskChoiceWhereUniqueInputSchema } from '../inputTypeSchemas/TaskChoiceWhereUniqueInputSchema'

export const TaskChoiceAggregateArgsSchema: z.ZodType<Prisma.TaskChoiceAggregateArgs> = z.object({
  where: TaskChoiceWhereInputSchema.optional(),
  orderBy: z.union([ TaskChoiceOrderByWithRelationInputSchema.array(),TaskChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskChoiceAggregateArgsSchema;
