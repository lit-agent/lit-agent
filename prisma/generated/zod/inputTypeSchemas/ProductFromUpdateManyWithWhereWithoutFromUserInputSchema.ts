import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromScalarWhereInputSchema } from './ProductFromScalarWhereInputSchema';
import { ProductFromUpdateManyMutationInputSchema } from './ProductFromUpdateManyMutationInputSchema';
import { ProductFromUncheckedUpdateManyWithoutFromUserInputSchema } from './ProductFromUncheckedUpdateManyWithoutFromUserInputSchema';

export const ProductFromUpdateManyWithWhereWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpdateManyWithWhereWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductFromUpdateManyMutationInputSchema),z.lazy(() => ProductFromUncheckedUpdateManyWithoutFromUserInputSchema) ]),
}).strict();

export default ProductFromUpdateManyWithWhereWithoutFromUserInputSchema;
