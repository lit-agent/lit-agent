import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceIncludeSchema } from '../inputTypeSchemas/TaskChoiceIncludeSchema'
import { TaskChoiceWhereInputSchema } from '../inputTypeSchemas/TaskChoiceWhereInputSchema'
import { TaskChoiceOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskChoiceOrderByWithRelationInputSchema'
import { TaskChoiceWhereUniqueInputSchema } from '../inputTypeSchemas/TaskChoiceWhereUniqueInputSchema'
import { TaskChoiceScalarFieldEnumSchema } from '../inputTypeSchemas/TaskChoiceScalarFieldEnumSchema'
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
import { TaskChoiceCountOutputTypeArgsSchema } from "../outputTypeSchemas/TaskChoiceCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskChoiceSelectSchema: z.ZodType<Prisma.TaskChoiceSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  taskFromId: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  TaskFrom: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskChoiceCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskChoiceFindFirstArgsSchema: z.ZodType<Prisma.TaskChoiceFindFirstArgs> = z.object({
  select: TaskChoiceSelectSchema.optional(),
  include: TaskChoiceIncludeSchema.optional(),
  where: TaskChoiceWhereInputSchema.optional(),
  orderBy: z.union([ TaskChoiceOrderByWithRelationInputSchema.array(),TaskChoiceOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskChoiceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskChoiceScalarFieldEnumSchema,TaskChoiceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default TaskChoiceFindFirstArgsSchema;
