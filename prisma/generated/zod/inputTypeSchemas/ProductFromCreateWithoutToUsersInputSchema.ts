import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateimagesInputSchema } from './ProductFromCreateimagesInputSchema';
import { UserCreateNestedOneWithoutFromProductsInputSchema } from './UserCreateNestedOneWithoutFromProductsInputSchema';
import { BillCreateNestedManyWithoutProductInputSchema } from './BillCreateNestedManyWithoutProductInputSchema';

export const ProductFromCreateWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateWithoutToUsersInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  images: z.union([ z.lazy(() => ProductFromCreateimagesInputSchema),z.string().array() ]).optional(),
  title: z.string(),
  description: z.string(),
  detail: z.string(),
  price: z.number().int(),
  total: z.number().int(),
  isOnsite: z.boolean().optional().nullable(),
  isSelfOperating: z.boolean().optional().nullable(),
  isReturnable: z.boolean().optional().nullable(),
  isReservationRequired: z.boolean().optional().nullable(),
  fromUser: z.lazy(() => UserCreateNestedOneWithoutFromProductsInputSchema),
  bills: z.lazy(() => BillCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export default ProductFromCreateWithoutToUsersInputSchema;
