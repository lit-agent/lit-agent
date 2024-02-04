import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateWithoutFromUserInputSchema } from './ProductToCreateWithoutFromUserInputSchema';
import { ProductToUncheckedCreateWithoutFromUserInputSchema } from './ProductToUncheckedCreateWithoutFromUserInputSchema';
import { ProductToCreateOrConnectWithoutFromUserInputSchema } from './ProductToCreateOrConnectWithoutFromUserInputSchema';
import { ProductToCreateManyFromUserInputEnvelopeSchema } from './ProductToCreateManyFromUserInputEnvelopeSchema';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';

export const ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProductToUncheckedCreateNestedManyWithoutFromUserInputSchema;
