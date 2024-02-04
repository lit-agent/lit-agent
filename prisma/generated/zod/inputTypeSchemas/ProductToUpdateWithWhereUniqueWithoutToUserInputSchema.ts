import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithoutToUserInputSchema } from './ProductToUpdateWithoutToUserInputSchema';
import { ProductToUncheckedUpdateWithoutToUserInputSchema } from './ProductToUncheckedUpdateWithoutToUserInputSchema';

export const ProductToUpdateWithWhereUniqueWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithWhereUniqueWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutToUserInputSchema) ]),
}).strict();

export default ProductToUpdateWithWhereUniqueWithoutToUserInputSchema;
