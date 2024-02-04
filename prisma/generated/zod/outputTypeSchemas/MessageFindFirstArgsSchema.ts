import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageIncludeSchema } from '../inputTypeSchemas/MessageIncludeSchema'
import { MessageWhereInputSchema } from '../inputTypeSchemas/MessageWhereInputSchema'
import { MessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/MessageOrderByWithRelationInputSchema'
import { MessageWhereUniqueInputSchema } from '../inputTypeSchemas/MessageWhereUniqueInputSchema'
import { MessageScalarFieldEnumSchema } from '../inputTypeSchemas/MessageScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { UserFindManyArgsSchema } from "../outputTypeSchemas/UserFindManyArgsSchema"
import { RoomArgsSchema } from "../outputTypeSchemas/RoomArgsSchema"
import { TaskFromArgsSchema } from "../outputTypeSchemas/TaskFromArgsSchema"
import { MessageCountOutputTypeArgsSchema } from "../outputTypeSchemas/MessageCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MessageSelectSchema: z.ZodType<Prisma.MessageSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  text: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  roomId: z.boolean().optional(),
  type: z.boolean().optional(),
  taskId: z.boolean().optional(),
  taskFromId: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  room: z.union([z.boolean(),z.lazy(() => RoomArgsSchema)]).optional(),
  task: z.union([z.boolean(),z.lazy(() => TaskFromArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MessageCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MessageFindFirstArgsSchema: z.ZodType<Prisma.MessageFindFirstArgs> = z.object({
  select: MessageSelectSchema.optional(),
  include: MessageIncludeSchema.optional(),
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MessageScalarFieldEnumSchema,MessageScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default MessageFindFirstArgsSchema;
