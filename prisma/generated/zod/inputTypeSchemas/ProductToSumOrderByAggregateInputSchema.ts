import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductToSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToSumOrderByAggregateInput> = z.object({
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductToSumOrderByAggregateInputSchema;
