import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToCreateWithoutFromUserInputSchema } from './ProductToCreateWithoutFromUserInputSchema';
import { ProductToUncheckedCreateWithoutFromUserInputSchema } from './ProductToUncheckedCreateWithoutFromUserInputSchema';

export const ProductToCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductToCreateOrConnectWithoutFromUserInputSchema;
