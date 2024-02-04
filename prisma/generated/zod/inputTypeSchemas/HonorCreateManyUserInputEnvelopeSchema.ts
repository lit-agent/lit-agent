import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorCreateManyUserInputSchema } from './HonorCreateManyUserInputSchema';

export const HonorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HonorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HonorCreateManyUserInputSchema),z.lazy(() => HonorCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export default HonorCreateManyUserInputEnvelopeSchema;
