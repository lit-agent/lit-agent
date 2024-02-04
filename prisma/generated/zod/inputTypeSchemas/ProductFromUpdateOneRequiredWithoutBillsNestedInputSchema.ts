import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutBillsInputSchema } from './ProductFromCreateWithoutBillsInputSchema';
import { ProductFromUncheckedCreateWithoutBillsInputSchema } from './ProductFromUncheckedCreateWithoutBillsInputSchema';
import { ProductFromCreateOrConnectWithoutBillsInputSchema } from './ProductFromCreateOrConnectWithoutBillsInputSchema';
import { ProductFromUpsertWithoutBillsInputSchema } from './ProductFromUpsertWithoutBillsInputSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromUpdateToOneWithWhereWithoutBillsInputSchema } from './ProductFromUpdateToOneWithWhereWithoutBillsInputSchema';
import { ProductFromUpdateWithoutBillsInputSchema } from './ProductFromUpdateWithoutBillsInputSchema';
import { ProductFromUncheckedUpdateWithoutBillsInputSchema } from './ProductFromUncheckedUpdateWithoutBillsInputSchema';

export const ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateOneRequiredWithoutBillsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutBillsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductFromCreateOrConnectWithoutBillsInputSchema).optional(),
  upsert: z.lazy(() => ProductFromUpsertWithoutBillsInputSchema).optional(),
  connect: z.lazy(() => ProductFromWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateToOneWithWhereWithoutBillsInputSchema),z.lazy(() => ProductFromUpdateWithoutBillsInputSchema),z.lazy(() => ProductFromUncheckedUpdateWithoutBillsInputSchema) ]).optional(),
}).strict();

export default ProductFromUpdateOneRequiredWithoutBillsNestedInputSchema;
