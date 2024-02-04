import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromUpdateWithoutFromUserInputSchema } from './ProductFromUpdateWithoutFromUserInputSchema';
import { ProductFromUncheckedUpdateWithoutFromUserInputSchema } from './ProductFromUncheckedUpdateWithoutFromUserInputSchema';
import { ProductFromCreateWithoutFromUserInputSchema } from './ProductFromCreateWithoutFromUserInputSchema';
import { ProductFromUncheckedCreateWithoutFromUserInputSchema } from './ProductFromUncheckedCreateWithoutFromUserInputSchema';

export const ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUpsertWithWhereUniqueWithoutFromUserInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutFromUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema) ]),
}).strict();

export default ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema;
