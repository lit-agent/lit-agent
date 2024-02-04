import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorWhereInputSchema } from './HonorWhereInputSchema';

export const HonorListRelationFilterSchema: z.ZodType<Prisma.HonorListRelationFilter> = z.object({
  every: z.lazy(() => HonorWhereInputSchema).optional(),
  some: z.lazy(() => HonorWhereInputSchema).optional(),
  none: z.lazy(() => HonorWhereInputSchema).optional()
}).strict();

export default HonorListRelationFilterSchema;
