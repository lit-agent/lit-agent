import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithoutToUserInputSchema } from './ProductToUpdateWithoutToUserInputSchema';
import { ProductToUncheckedUpdateWithoutToUserInputSchema } from './ProductToUncheckedUpdateWithoutToUserInputSchema';
import { ProductToCreateWithoutToUserInputSchema } from './ProductToCreateWithoutToUserInputSchema';
import { ProductToUncheckedCreateWithoutToUserInputSchema } from './ProductToUncheckedCreateWithoutToUserInputSchema';

export const ProductToUpsertWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpsertWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductToUpdateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutToUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export default ProductToUpsertWithWhereUniqueWithoutToUserInputSchema;
