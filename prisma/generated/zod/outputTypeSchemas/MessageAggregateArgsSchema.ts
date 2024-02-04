import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageWhereInputSchema } from '../inputTypeSchemas/MessageWhereInputSchema'
import { MessageOrderByWithRelationInputSchema } from '../inputTypeSchemas/MessageOrderByWithRelationInputSchema'
import { MessageWhereUniqueInputSchema } from '../inputTypeSchemas/MessageWhereUniqueInputSchema'

export const MessageAggregateArgsSchema: z.ZodType<Prisma.MessageAggregateArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithRelationInputSchema.array(),MessageOrderByWithRelationInputSchema ]).optional(),
  cursor: MessageWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MessageAggregateArgsSchema;
