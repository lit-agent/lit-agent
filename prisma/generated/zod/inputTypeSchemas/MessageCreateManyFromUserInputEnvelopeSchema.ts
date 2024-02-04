import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateManyFromUserInputSchema } from './MessageCreateManyFromUserInputSchema';

export const MessageCreateManyFromUserInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyFromUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyFromUserInputSchema),z.lazy(() => MessageCreateManyFromUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MessageCreateManyFromUserInputEnvelopeSchema;
