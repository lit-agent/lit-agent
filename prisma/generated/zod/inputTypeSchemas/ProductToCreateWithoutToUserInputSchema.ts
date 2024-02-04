import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateNestedOneWithoutToUsersInputSchema } from './ProductFromCreateNestedOneWithoutToUsersInputSchema';

export const ProductToCreateWithoutToUserInputSchema: z.ZodType<Prisma.ProductToCreateWithoutToUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional(),
  fromUser: z.lazy(() => ProductFromCreateNestedOneWithoutToUsersInputSchema)
}).strict();

export default ProductToCreateWithoutToUserInputSchema;
