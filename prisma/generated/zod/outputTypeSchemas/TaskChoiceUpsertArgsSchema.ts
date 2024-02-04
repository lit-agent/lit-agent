import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskChoiceIncludeSchema } from '../inputTypeSchemas/TaskChoiceIncludeSchema'
import { TaskChoiceWhereUniqueInputSchema } from '../inputTypeSchemas/TaskChoiceWhereUniqueInputSchema'
import { TaskChoiceCreateInputSchema } from '../inputTypeSchemas/TaskChoiceCreateInputSchema'
import { TaskChoiceUncheckedCreateInputSchema } from '../inputTypeSchemas/TaskChoiceUncheckedCreateInputSchema'
import { TaskChoiceUpdateInputSchema } from '../inputTypeSchemas/TaskChoiceUpdateInputSchema'
import { TaskChoiceUncheckedUpdateInputSchema } from '../inputTypeSchemas/TaskChoiceUncheckedUpdateInputSchema'
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

export const TaskChoiceUpsertArgsSchema: z.ZodType<Prisma.TaskChoiceUpsertArgs> = z.object({
  select: TaskChoiceSelectSchema.optional(),
  include: TaskChoiceIncludeSchema.optional(),
  where: TaskChoiceWhereUniqueInputSchema,
  create: z.union([ TaskChoiceCreateInputSchema,TaskChoiceUncheckedCreateInputSchema ]),
  update: z.union([ TaskChoiceUpdateInputSchema,TaskChoiceUncheckedUpdateInputSchema ]),
}).strict()

export default TaskChoiceUpsertArgsSchema;
