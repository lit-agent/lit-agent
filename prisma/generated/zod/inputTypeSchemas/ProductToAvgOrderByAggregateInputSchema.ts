import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductToAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToAvgOrderByAggregateInput> = z.object({
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductToAvgOrderByAggregateInputSchema;
