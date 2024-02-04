import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToScalarWhereInputSchema } from './ProductToScalarWhereInputSchema';
import { ProductToUpdateManyMutationInputSchema } from './ProductToUpdateManyMutationInputSchema';
import { ProductToUncheckedUpdateManyWithoutToUserInputSchema } from './ProductToUncheckedUpdateManyWithoutToUserInputSchema';

export const ProductToUpdateManyWithWhereWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithWhereWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateManyMutationInputSchema),z.lazy(() => ProductToUncheckedUpdateManyWithoutToUserInputSchema) ]),
}).strict();

export default ProductToUpdateManyWithWhereWithoutToUserInputSchema;
