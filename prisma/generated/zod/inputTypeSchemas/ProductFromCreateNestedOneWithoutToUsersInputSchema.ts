import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutToUsersInputSchema } from './ProductFromCreateWithoutToUsersInputSchema';
import { ProductFromUncheckedCreateWithoutToUsersInputSchema } from './ProductFromUncheckedCreateWithoutToUsersInputSchema';
import { ProductFromCreateOrConnectWithoutToUsersInputSchema } from './ProductFromCreateOrConnectWithoutToUsersInputSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';

export const ProductFromCreateNestedOneWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateNestedOneWithoutToUsersInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional()
}).strict();

export default ProductFromCreateNestedOneWithoutToUsersInputSchema;
