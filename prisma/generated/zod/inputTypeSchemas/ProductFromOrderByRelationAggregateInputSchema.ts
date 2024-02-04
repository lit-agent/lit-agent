import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductFromOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductFromOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductFromOrderByRelationAggregateInputSchema;
