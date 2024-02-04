import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromWhereInputSchema } from '../inputTypeSchemas/TaskFromWhereInputSchema'
import { TaskFromOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TaskFromOrderByWithAggregationInputSchema'
import { TaskFromScalarFieldEnumSchema } from '../inputTypeSchemas/TaskFromScalarFieldEnumSchema'
import { TaskFromScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TaskFromScalarWhereWithAggregatesInputSchema'

export const TaskFromGroupByArgsSchema: z.ZodType<Prisma.TaskFromGroupByArgs> = z.object({
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithAggregationInputSchema.array(),TaskFromOrderByWithAggregationInputSchema ]).optional(),
  by: TaskFromScalarFieldEnumSchema.array(),
  having: TaskFromScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskFromGroupByArgsSchema;
