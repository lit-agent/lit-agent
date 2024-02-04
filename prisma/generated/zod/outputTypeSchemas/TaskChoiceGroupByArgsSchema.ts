import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceWhereInputSchema } from '../inputTypeSchemas/TaskChoiceWhereInputSchema'
import { TaskChoiceOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TaskChoiceOrderByWithAggregationInputSchema'
import { TaskChoiceScalarFieldEnumSchema } from '../inputTypeSchemas/TaskChoiceScalarFieldEnumSchema'
import { TaskChoiceScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TaskChoiceScalarWhereWithAggregatesInputSchema'

export const TaskChoiceGroupByArgsSchema: z.ZodType<Prisma.TaskChoiceGroupByArgs> = z.object({
  where: TaskChoiceWhereInputSchema.optional(),
  orderBy: z.union([ TaskChoiceOrderByWithAggregationInputSchema.array(),TaskChoiceOrderByWithAggregationInputSchema ]).optional(),
  by: TaskChoiceScalarFieldEnumSchema.array(),
  having: TaskChoiceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskChoiceGroupByArgsSchema;
