import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MessageCountOutputTypeSelectSchema } from './MessageCountOutputTypeSelectSchema';

export const MessageCountOutputTypeArgsSchema: z.ZodType<Prisma.MessageCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MessageCountOutputTypeSelectSchema).nullish(),
}).strict();

export default MessageCountOutputTypeSelectSchema;
