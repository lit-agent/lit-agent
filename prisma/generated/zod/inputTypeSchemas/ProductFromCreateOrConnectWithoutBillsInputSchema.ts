import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromCreateWithoutBillsInputSchema } from './ProductFromCreateWithoutBillsInputSchema';
import { ProductFromUncheckedCreateWithoutBillsInputSchema } from './ProductFromUncheckedCreateWithoutBillsInputSchema';

export const ProductFromCreateOrConnectWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromCreateOrConnectWithoutBillsInput> = z.object({
  where: z.lazy(() => ProductFromWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]),
}).strict();

export default ProductFromCreateOrConnectWithoutBillsInputSchema;
