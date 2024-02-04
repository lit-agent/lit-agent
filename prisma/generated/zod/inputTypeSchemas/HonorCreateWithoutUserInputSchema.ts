import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';

export const HonorCreateWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateWithoutUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default HonorCreateWithoutUserInputSchema;
