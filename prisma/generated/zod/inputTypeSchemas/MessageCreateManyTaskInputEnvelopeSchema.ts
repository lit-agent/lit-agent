import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateManyTaskInputSchema } from './MessageCreateManyTaskInputSchema';

export const MessageCreateManyTaskInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyTaskInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyTaskInputSchema),z.lazy(() => MessageCreateManyTaskInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MessageCreateManyTaskInputEnvelopeSchema;
