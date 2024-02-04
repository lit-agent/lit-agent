import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageWhereInputSchema } from '../inputTypeSchemas/MessageWhereInputSchema'
import { MessageOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MessageOrderByWithAggregationInputSchema'
import { MessageScalarFieldEnumSchema } from '../inputTypeSchemas/MessageScalarFieldEnumSchema'
import { MessageScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MessageScalarWhereWithAggregatesInputSchema'

export const MessageGroupByArgsSchema: z.ZodType<Prisma.MessageGroupByArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
  orderBy: z.union([ MessageOrderByWithAggregationInputSchema.array(),MessageOrderByWithAggregationInputSchema ]).optional(),
  by: MessageScalarFieldEnumSchema.array(),
  having: MessageScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MessageGroupByArgsSchema;
