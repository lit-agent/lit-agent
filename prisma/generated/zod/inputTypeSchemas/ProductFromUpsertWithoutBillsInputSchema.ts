import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromUpdateWithoutBillsInputSchema } from './ProductFromUpdateWithoutBillsInputSchema';
import { ProductFromUncheckedUpdateWithoutBillsInputSchema } from './ProductFromUncheckedUpdateWithoutBillsInputSchema';
import { ProductFromCreateWithoutBillsInputSchema } from './ProductFromCreateWithoutBillsInputSchema';
import { ProductFromUncheckedCreateWithoutBillsInputSchema } from './ProductFromUncheckedCreateWithoutBillsInputSchema';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';

export const ProductFromUpsertWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUpsertWithoutBillsInput> = z.object({
  update: z.union([ z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]),
  where: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export default ProductFromUpsertWithoutBillsInputSchema;
