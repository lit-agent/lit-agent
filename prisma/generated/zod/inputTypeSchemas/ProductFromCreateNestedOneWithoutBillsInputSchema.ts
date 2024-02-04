import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutBillsInputSchema } from './ProductFromCreateWithoutBillsInputSchema';
import { ProductFromUncheckedCreateWithoutBillsInputSchema } from './ProductFromUncheckedCreateWithoutBillsInputSchema';
import { ProductFromCreateOrConnectWithoutBillsInputSchema } from './ProductFromCreateOrConnectWithoutBillsInputSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';

export const ProductFromCreateNestedOneWithoutBillsInputSchema: z.ZodType<Prisma.ProductFromCreateNestedOneWithoutBillsInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional()
}).strict();

export default ProductFromCreateNestedOneWithoutBillsInputSchema;
