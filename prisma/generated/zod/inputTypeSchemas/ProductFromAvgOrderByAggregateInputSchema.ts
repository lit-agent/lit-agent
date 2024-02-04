import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductFromAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromAvgOrderByAggregateInput> = z.object({
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductFromAvgOrderByAggregateInputSchema;
