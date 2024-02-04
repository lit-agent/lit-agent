import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateWithoutToUserInputSchema } from './ProductToCreateWithoutToUserInputSchema';
import { ProductToUncheckedCreateWithoutToUserInputSchema } from './ProductToUncheckedCreateWithoutToUserInputSchema';
import { ProductToCreateOrConnectWithoutToUserInputSchema } from './ProductToCreateOrConnectWithoutToUserInputSchema';
import { ProductToCreateManyToUserInputEnvelopeSchema } from './ProductToCreateManyToUserInputEnvelopeSchema';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';

export const ProductToUncheckedCreateNestedManyWithoutToUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateNestedManyWithoutToUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProductToUncheckedCreateNestedManyWithoutToUserInputSchema;
