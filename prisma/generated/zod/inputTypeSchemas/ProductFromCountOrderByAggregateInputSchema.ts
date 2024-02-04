import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const ProductFromCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductFromCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  images: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  detail: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  total: z.lazy(() => SortOrderSchema).optional(),
  isOnsite: z.lazy(() => SortOrderSchema).optional(),
  isSelfOperating: z.lazy(() => SortOrderSchema).optional(),
  isReturnable: z.lazy(() => SortOrderSchema).optional(),
  isReservationRequired: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default ProductFromCountOrderByAggregateInputSchema;
