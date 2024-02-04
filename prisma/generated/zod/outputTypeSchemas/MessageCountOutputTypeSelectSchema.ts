import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const MessageCountOutputTypeSelectSchema: z.ZodType<Prisma.MessageCountOutputTypeSelect> = z.object({
  toUsers: z.boolean().optional(),
}).strict();

export default MessageCountOutputTypeSelectSchema;
