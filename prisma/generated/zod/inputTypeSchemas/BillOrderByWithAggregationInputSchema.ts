import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { BillCountOrderByAggregateInputSchema } from './BillCountOrderByAggregateInputSchema';
import { BillMaxOrderByAggregateInputSchema } from './BillMaxOrderByAggregateInputSchema';
import { BillMinOrderByAggregateInputSchema } from './BillMinOrderByAggregateInputSchema';

export const BillOrderByWithAggregationInputSchema: z.ZodType<Prisma.BillOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => BillCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BillMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BillMinOrderByAggregateInputSchema).optional()
}).strict();

export default BillOrderByWithAggregationInputSchema;
