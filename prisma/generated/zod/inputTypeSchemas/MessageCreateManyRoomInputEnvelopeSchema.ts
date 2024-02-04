import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageCreateManyRoomInputSchema } from './MessageCreateManyRoomInputSchema';

export const MessageCreateManyRoomInputEnvelopeSchema: z.ZodType<Prisma.MessageCreateManyRoomInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MessageCreateManyRoomInputSchema),z.lazy(() => MessageCreateManyRoomInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default MessageCreateManyRoomInputEnvelopeSchema;
