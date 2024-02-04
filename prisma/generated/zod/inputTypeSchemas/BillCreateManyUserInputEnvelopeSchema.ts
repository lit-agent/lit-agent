import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateManyUserInputSchema } from './BillCreateManyUserInputSchema';

export const BillCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BillCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BillCreateManyUserInputSchema),z.lazy(() => BillCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default BillCreateManyUserInputEnvelopeSchema;
