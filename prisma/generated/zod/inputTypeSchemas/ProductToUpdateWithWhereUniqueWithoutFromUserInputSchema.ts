import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithoutFromUserInputSchema } from './ProductToUpdateWithoutFromUserInputSchema';
import { ProductToUncheckedUpdateWithoutFromUserInputSchema } from './ProductToUncheckedUpdateWithoutFromUserInputSchema';

export const ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpdateWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema;
