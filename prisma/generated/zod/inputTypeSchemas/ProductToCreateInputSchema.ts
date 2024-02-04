import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateNestedOneWithoutToUsersInputSchema } from './ProductFromCreateNestedOneWithoutToUsersInputSchema';
import { UserCreateNestedOneWithoutToProductsInputSchema } from './UserCreateNestedOneWithoutToProductsInputSchema';

export const ProductToCreateInputSchema: z.ZodType<Prisma.ProductToCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  fromUser: z.lazy(() => ProductFromCreateNestedOneWithoutToUsersInputSchema),
  toUser: z.lazy(() => UserCreateNestedOneWithoutToProductsInputSchema)
}).strict();

export default ProductToCreateInputSchema;
