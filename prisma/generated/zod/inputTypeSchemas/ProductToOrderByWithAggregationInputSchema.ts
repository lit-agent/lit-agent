import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ProductToCountOrderByAggregateInputSchema } from './ProductToCountOrderByAggregateInputSchema';
import { ProductToAvgOrderByAggregateInputSchema } from './ProductToAvgOrderByAggregateInputSchema';
import { ProductToMaxOrderByAggregateInputSchema } from './ProductToMaxOrderByAggregateInputSchema';
import { ProductToMinOrderByAggregateInputSchema } from './ProductToMinOrderByAggregateInputSchema';
import { ProductToSumOrderByAggregateInputSchema } from './ProductToSumOrderByAggregateInputSchema';

export const ProductToOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductToOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductToCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductToAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductToMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductToMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductToSumOrderByAggregateInputSchema).optional()
}).strict();

export default ProductToOrderByWithAggregationInputSchema;
