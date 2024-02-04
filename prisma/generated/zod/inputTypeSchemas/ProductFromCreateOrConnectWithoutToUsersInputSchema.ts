import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromCreateWithoutToUsersInputSchema } from './ProductFromCreateWithoutToUsersInputSchema';
import { ProductFromUncheckedCreateWithoutToUsersInputSchema } from './ProductFromUncheckedCreateWithoutToUsersInputSchema';

export const ProductFromCreateOrConnectWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutToUsersInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]),
}).strict();

export default ProductFromCreateOrConnectWithoutToUsersInputSchema;
