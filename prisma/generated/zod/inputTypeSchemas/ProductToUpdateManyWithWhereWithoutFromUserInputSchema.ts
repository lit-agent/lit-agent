import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToScalarWhereInputSchema } from './ProductToScalarWhereInputSchema';
import { ProductToUpdateManyMutationInputSchema } from './ProductToUpdateManyMutationInputSchema';
import { ProductToUncheckedUpdateManyWithoutFromUserInputSchema } from './ProductToUncheckedUpdateManyWithoutFromUserInputSchema';

export const ProductToUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductToUpdateManyMutationInputSchema),z.lazy(() => ProductToUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export default ProductToUpdateManyWithWhereWithoutFromUserInputSchema;
