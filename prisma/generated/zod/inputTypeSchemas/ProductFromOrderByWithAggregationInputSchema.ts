import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { ProductFromCountOrderByAggregateInputSchema } from './ProductFromCountOrderByAggregateInputSchema';
import { ProductFromAvgOrderByAggregateInputSchema } from './ProductFromAvgOrderByAggregateInputSchema';
import { ProductFromMaxOrderByAggregateInputSchema } from './ProductFromMaxOrderByAggregateInputSchema';
import { ProductFromMinOrderByAggregateInputSchema } from './ProductFromMinOrderByAggregateInputSchema';
import { ProductFromSumOrderByAggregateInputSchema } from './ProductFromSumOrderByAggregateInputSchema';

export const ProductFromOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductFromOrderByWithAggregationInput> = z.object({
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
  isOnsite: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isSelfOperating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReturnable: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isReservationRequired: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProductFromCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductFromAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductFromMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductFromMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductFromSumOrderByAggregateInputSchema).optional()
}).strict();

export default ProductFromOrderByWithAggregationInputSchema;
