import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithoutFromUserInputSchema } from './ProductToUpdateWithoutFromUserInputSchema';
import { ProductToUncheckedUpdateWithoutFromUserInputSchema } from './ProductToUncheckedUpdateWithoutFromUserInputSchema';
import { ProductToCreateWithoutFromUserInputSchema } from './ProductToCreateWithoutFromUserInputSchema';
import { ProductToUncheckedCreateWithoutFromUserInputSchema } from './ProductToUncheckedCreateWithoutFromUserInputSchema';

export const ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductToWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductToUpdateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema;
