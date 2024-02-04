import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageCreateManyInputSchema } from '../inputTypeSchemas/MessageCreateManyInputSchema'

export const MessageCreateManyArgsSchema: z.ZodType<Prisma.MessageCreateManyArgs> = z.object({
  data: z.union([ MessageCreateManyInputSchema,MessageCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default MessageCreateManyArgsSchema;
