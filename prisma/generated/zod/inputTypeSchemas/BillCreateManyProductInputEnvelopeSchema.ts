import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillCreateManyProductInputSchema } from './BillCreateManyProductInputSchema';

export const BillCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.BillCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BillCreateManyProductInputSchema),z.lazy(() => BillCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default BillCreateManyProductInputEnvelopeSchema;
