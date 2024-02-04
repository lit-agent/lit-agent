import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';

export const HonorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedCreateWithoutUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default HonorUncheckedCreateWithoutUserInputSchema;
