import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageWhereInputSchema } from './MessageWhereInputSchema';

export const MessageListRelationFilterSchema: z.ZodType<Prisma.MessageListRelationFilter> = z.object({
  every: z.lazy(() => MessageWhereInputSchema).optional(),
  some: z.lazy(() => MessageWhereInputSchema).optional(),
  none: z.lazy(() => MessageWhereInputSchema).optional()
}).strict();

export default MessageListRelationFilterSchema;
