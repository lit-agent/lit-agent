import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromUpdateWithoutFromUserInputSchema } from './ProductFromUpdateWithoutFromUserInputSchema';
import { ProductFromUncheckedUpdateWithoutFromUserInputSchema } from './ProductFromUncheckedUpdateWithoutFromUserInputSchema';

export const ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema;
