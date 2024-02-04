import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutToUsersInputSchema } from './ProductFromCreateWithoutToUsersInputSchema';
import { ProductFromUncheckedCreateWithoutToUsersInputSchema } from './ProductFromUncheckedCreateWithoutToUsersInputSchema';
import { ProductFromCreateOrConnectWithoutToUsersInputSchema } from './ProductFromCreateOrConnectWithoutToUsersInputSchema';
import { ProductFromUpsertWithoutToUsersInputSchema } from './ProductFromUpsertWithoutToUsersInputSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema } from './ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema';
import { ProductFromUpdateWithoutToUsersInputSchema } from './ProductFromUpdateWithoutToUsersInputSchema';
import { ProductFromUncheckedUpdateWithoutToUsersInputSchema } from './ProductFromUncheckedUpdateWithoutToUsersInputSchema';

export const ProductFromUpdateOneRequiredWithoutToUsersNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateOneRequiredWithoutToUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutToUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutToUsersInputSchema).optional(),
  upsert: z.lazy(() => ProductFromUpsertWithoutToUsersInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateToOneWithWhereWithoutToUsersInputSchema),z.lazy(() => ProductFromUpdateWithoutToUsersInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutToUsersInputSchema) ]).optional(),
}).strict();

export default ProductFromUpdateOneRequiredWithoutToUsersNestedInputSchema;
