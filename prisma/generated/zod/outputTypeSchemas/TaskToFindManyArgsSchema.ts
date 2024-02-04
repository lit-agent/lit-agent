import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskToIncludeSchema } from '../inputTypeSchemas/TaskToIncludeSchema'
import { TaskToWhereInputSchema } from '../inputTypeSchemas/TaskToWhereInputSchema'
import { TaskToOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskToOrderByWithRelationInputSchema'
import { TaskToWhereUniqueInputSchema } from '../inputTypeSchemas/TaskToWhereUniqueInputSchema'
import { TaskToScalarFieldEnumSchema } from '../inputTypeSchemas/TaskToScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskToSelectSchema: z.ZodType<Prisma.TaskToSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  taskId: z.boolean().optional(),
  status: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
}).strict()

export const TaskToFindManyArgsSchema: z.ZodType<Prisma.TaskToFindManyArgs> = z.object({
  select: TaskToSelectSchema.optional(),
  include: TaskToIncludeSchema.optional(),
  where: TaskToWhereInputSchema.optional(),
  orderBy: z.union([ TaskToOrderByWithRelationInputSchema.array(),TaskToOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskToScalarFieldEnumSchema,TaskToScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default TaskToFindManyArgsSchema;
