import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserWhereInputSchema } from '../inputTypeSchemas/UserWhereInputSchema'
import { UserOrderByWithRelationInputSchema } from '../inputTypeSchemas/UserOrderByWithRelationInputSchema'
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'
import { UserScalarFieldEnumSchema } from '../inputTypeSchemas/UserScalarFieldEnumSchema'
import { AccountFindManyArgsSchema } from "../outputTypeSchemas/AccountFindManyArgsSchema"
import { SessionFindManyArgsSchema } from "../outputTypeSchemas/SessionFindManyArgsSchema"
import { HonorFindManyArgsSchema } from "../outputTypeSchemas/HonorFindManyArgsSchema"
import { RoomFindManyArgsSchema } from "../outputTypeSchemas/RoomFindManyArgsSchema"
import { MessageFindManyArgsSchema } from "../outputTypeSchemas/MessageFindManyArgsSchema"
import { TaskFromFindManyArgsSchema } from "../outputTypeSchemas/TaskFromFindManyArgsSchema"
import { TaskToFindManyArgsSchema } from "../outputTypeSchemas/TaskToFindManyArgsSchema"
import { ProductFromFindManyArgsSchema } from "../outputTypeSchemas/ProductFromFindManyArgsSchema"
import { ProductToFindManyArgsSchema } from "../outputTypeSchemas/ProductToFindManyArgsSchema"
import { BillFindManyArgsSchema } from "../outputTypeSchemas/BillFindManyArgsSchema"
import { TaskChoiceArgsSchema } from "../outputTypeSchemas/TaskChoiceArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  validated: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  image: z.boolean().optional(),
  status: z.boolean().optional(),
  type: z.boolean().optional(),
  currentBalance: z.boolean().optional(),
  historyBalance: z.boolean().optional(),
  taskChoiceId: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  honors: z.union([z.boolean(),z.lazy(() => HonorFindManyArgsSchema)]).optional(),
  rooms: z.union([z.boolean(),z.lazy(() => RoomFindManyArgsSchema)]).optional(),
  sentMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  receivedMessages: z.union([z.boolean(),z.lazy(() => MessageFindManyArgsSchema)]).optional(),
  fromTasks: z.union([z.boolean(),z.lazy(() => TaskFromFindManyArgsSchema)]).optional(),
  toTasks: z.union([z.boolean(),z.lazy(() => TaskToFindManyArgsSchema)]).optional(),
  fromProducts: z.union([z.boolean(),z.lazy(() => ProductFromFindManyArgsSchema)]).optional(),
  toProducts: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  TaskChoice: z.union([z.boolean(),z.lazy(() => TaskChoiceArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default UserFindFirstArgsSchema;
