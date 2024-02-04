import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';

export const HonorUncheckedCreateInputSchema: z.ZodType<Prisma.HonorUncheckedCreateInput> = z.object({
  id: z.lazy(() => HonorTypeSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export default HonorUncheckedCreateInputSchema;
