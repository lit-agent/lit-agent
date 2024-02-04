import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';
import { ProductFromUpdateWithoutToUsersInputSchema } from './ProductFromUpdateWithoutToUsersInputSchema';
import { ProductFromUncheckedUpdateWithoutToUsersInputSchema } from './ProductFromUncheckedUpdateWithoutToUsersInputSchema';

export const ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema: z.ZodType<Prisma.ProductFromUpdateToOneWithWhereWithoutToUsersInput> = z.object({
  where: z.lazy(() => ProductFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]),
}).strict();

export default ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema;
