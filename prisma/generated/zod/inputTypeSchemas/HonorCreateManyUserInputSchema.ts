import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';

export const HonorCreateManyUserInputSchema: z.ZodType<Prisma.HonorCreateManyUserInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default HonorCreateManyUserInputSchema;
