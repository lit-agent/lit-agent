import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';
import { ProductToOrderByRelationAggregateInputSchema } from './ProductToOrderByRelationAggregateInputSchema';
import { BillOrderByRelationAggregateInputSchema } from './BillOrderByRelationAggregateInputSchema';

export const ProductFromOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductFromOrderByWithRelationInput> = z.object({
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
  fromUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  toUsers: z.lazy(() => ProductToOrderByRelationAggregateInputSchema).optional(),
  bills: z.lazy(() => BillOrderByRelationAggregateInputSchema).optional()
}).strict();

export default ProductFromOrderByWithRelationInputSchema;
