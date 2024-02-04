import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToWhereInputSchema } from '../inputTypeSchemas/TaskToWhereInputSchema'
import { TaskToOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskToOrderByWithRelationInputSchema'
import { TaskToWhereUniqueInputSchema } from '../inputTypeSchemas/TaskToWhereUniqueInputSchema'

export const TaskToAggregateArgsSchema: z.ZodType<Prisma.TaskToAggregateArgs> = z.object({
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default TaskToAggregateArgsSchema;
