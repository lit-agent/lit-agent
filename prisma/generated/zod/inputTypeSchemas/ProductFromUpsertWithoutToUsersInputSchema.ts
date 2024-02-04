import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromUpdateWithoutToUsersInputSchema } from './ProductFromUpdateWithoutToUsersInputSchema';
import { ProductFromUncheckedUpdateWithoutToUsersInputSchema } from './ProductFromUncheckedUpdateWithoutToUsersInputSchema';
import { ProductFromCreateWithoutToUsersInputSchema } from './ProductFromCreateWithoutToUsersInputSchema';
import { ProductFromUncheckedCreateWithoutToUsersInputSchema } from './ProductFromUncheckedCreateWithoutToUsersInputSchema';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';

export const ProductFromUpsertWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUpsertWithoutToUsersInput> = z.object({
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]),
  where: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export default ProductFromUpsertWithoutToUsersInputSchema;
