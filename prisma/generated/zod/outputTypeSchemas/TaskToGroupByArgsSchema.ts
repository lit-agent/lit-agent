import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToWhereInputSchema } from '../inputTypeSchemas/TaskToWhereInputSchema'
import { TaskToOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TaskToOrderByWithAggregationInputSchema'
import { TaskToScalarFieldEnumSchema } from '../inputTypeSchemas/TaskToScalarFieldEnumSchema'
import { TaskToScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TaskToScalarWhereWithAggregatesInputSchema'

export const TaskToGroupByArgsSchema: z.ZodType<Prisma.TaskToGroupByArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithAggregationInputSchema.array(),TaskToOrderByWithAggregationInputSchema ]).optional(),
  by: TaskToScalarFieldEnumSchema.array(),
  having: TaskToScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskToGroupByArgsSchema;
