import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageWhereInputSchema } from '../inputTypeSchemas/MessageWhereInputSchema'

export const MessageDeleteManyArgsSchema: z.ZodType<Prisma.MessageDeleteManyArgs> = z.object({
  where: MessageWhereInputSchema.optional(),
}).strict()

export default MessageDeleteManyArgsSchema;
