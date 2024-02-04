import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';
import { ProductFromUpdateWithoutBillsInputSchema } from './ProductFromUpdateWithoutBillsInputSchema';
import { ProductFromUncheckedUpdateWithoutBillsInputSchema } from './ProductFromUncheckedUpdateWithoutBillsInputSchema';

export const ProductFromUpdateToOneWithWhereWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromUpdateToOneWithWhereWithoutBillsInput> = z.object({
  where: z.lazy(() => ProductFromWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]),
}).strict();

export default ProductFromUpdateToOneWithWhereWithoutBillsInputSchema;
