import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserCreateNestedOneWithoutToProductsInputSchema } from './UserCreateNestedOneWithoutToProductsInputSchema';

export const ProductToCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  toUser: z.lazy(() => UserCreateNestedOneWithoutToProductsInputSchema)
}).strict();

export default ProductToCreateWithoutFromUserInputSchema;
