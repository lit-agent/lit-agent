import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { HonorCountOrderByAggregateInputSchema } from './HonorCountOrderByAggregateInputSchema';
import { HonorMaxOrderByAggregateInputSchema } from './HonorMaxOrderByAggregateInputSchema';
import { HonorMinOrderByAggregateInputSchema } from './HonorMinOrderByAggregateInputSchema';

export const HonorOrderByWithAggregationInputSchema: z.ZodType<Prisma.HonorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HonorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HonorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HonorMinOrderByAggregateInputSchema).optional()
}).strict();

export default HonorOrderByWithAggregationInputSchema;
