import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToCreateWithoutToUserInputSchema } from './ProductToCreateWithoutToUserInputSchema';
import { ProductToUncheckedCreateWithoutToUserInputSchema } from './ProductToUncheckedCreateWithoutToUserInputSchema';

export const ProductToCreateOrConnectWithoutToUserInputSchema: z.ZodType<Prisma.ProductToCreateOrConnectWithoutToUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema) ]),
}).strict();

export default ProductToCreateOrConnectWithoutToUserInputSchema;
