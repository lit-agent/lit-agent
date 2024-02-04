import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromCreateWithoutFromUserInputSchema } from './ProductFromCreateWithoutFromUserInputSchema';
import { ProductFromUncheckedCreateWithoutFromUserInputSchema } from './ProductFromUncheckedCreateWithoutFromUserInputSchema';

export const ProductFromCreateOrConnectWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductFromCreateOrConnectWithoutFromUserInputSchema;
