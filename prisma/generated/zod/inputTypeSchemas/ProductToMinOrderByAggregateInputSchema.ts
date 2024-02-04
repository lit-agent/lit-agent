import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductToMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductToMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductToMinOrderByAggregateInputSchema;
