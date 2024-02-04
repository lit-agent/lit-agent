import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TaskFromIncludeSchema } from '../inputTypeSchemas/TaskFromIncludeSchema'
import { TaskFromWhereInputSchema } from '../inputTypeSchemas/TaskFromWhereInputSchema'
import { TaskFromOrderByWithRelationInputSchema } from '../inputTypeSchemas/TaskFromOrderByWithRelationInputSchema'
import { TaskFromWhereUniqueInputSchema } from '../inputTypeSchemas/TaskFromWhereUniqueInputSchema'
import { TaskFromScalarFieldEnumSchema } from '../inputTypeSchemas/TaskFromScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { TaskToFindManyArgsSchema } from "../outputTypeSchemas/TaskToFindManyArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { TaskChoiceFindManyArgsSchema } from "../outputTypeSchemas/TaskChoiceFindManyArgsSchema"
import { TaskFromCountOutputTypeArgsSchema } from "../outputTypeSchemas/TaskFromCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TaskFromSelectSchema: z.ZodType<Prisma.TaskFromSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  title: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  value: z.boolean().optional(),
  startTime: z.boolean().optional(),
  endTime: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  status: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  messages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  choices: z.union([z.boolean(),z.lazy(() => TaskChoiceFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TaskFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TaskFromFindManyArgsSchema: z.ZodType<Prisma.TaskFromFindManyArgs> = z.object({
  select: TaskFromSelectSchema.optional(),
  include: TaskFromIncludeSchema.optional(),
  where: TaskFromWhereInputSchema.optional(),
  orderBy: z.union([ TaskFromOrderByWithRelationInputSchema.array(),TaskFromOrderByWithRelationInputSchema ]).optional(),
  cursor: TaskFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TaskFromScalarFieldEnumSchema,TaskFromScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default TaskFromFindManyArgsSchema;
