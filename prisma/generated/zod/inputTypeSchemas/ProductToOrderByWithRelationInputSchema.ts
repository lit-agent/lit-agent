import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { ProductFromOrderByWithRelationInputSchema } from './ProductFromOrderByWithRelationInputSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const ProductToOrderByWithRelationInputSchema: z.ZodType<Prisma.ProductToOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  fromUserId: z.lazy(() => SortOrderSchema).optional(),
  toUserId: z.lazy(() => SortOrderSchema).optional(),
  isFavored: z.lazy(() => SortOrderSchema).optional(),
  inCar: z.lazy(() => SortOrderSchema).optional(),
  bought: z.lazy(() => SortOrderSchema).optional(),
  fromUser: z.lazy(() => ProductFromOrderByWithRelationInputSchema).optional(),
  toUser: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export default ProductToOrderByWithRelationInputSchema;
