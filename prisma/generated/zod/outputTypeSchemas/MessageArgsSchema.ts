import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageSelectSchema } from '../inputTypeSchemas/MessageSelectSchema';
import { MessageIncludeSchema } from '../inputTypeSchemas/MessageIncludeSchema';

export const MessageArgsSchema: z.ZodType<Prisma.MessageDefaultArgs> = z.object({
  select: z.lazy(() => MessageSelectSchema).optional(),
  include: z.lazy(() => MessageIncludeSchema).optional(),
}).strict();

export default MessageArgsSchema;
