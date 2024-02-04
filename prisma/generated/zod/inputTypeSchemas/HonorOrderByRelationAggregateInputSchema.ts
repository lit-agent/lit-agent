import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const HonorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HonorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default HonorOrderByRelationAggregateInputSchema;
