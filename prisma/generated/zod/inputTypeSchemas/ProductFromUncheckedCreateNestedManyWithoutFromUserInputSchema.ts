import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutFromUserInputSchema } from './ProductFromCreateWithoutFromUserInputSchema';
import { ProductFromUncheckedCreateWithoutFromUserInputSchema } from './ProductFromUncheckedCreateWithoutFromUserInputSchema';
import { ProductFromCreateOrConnectWithoutFromUserInputSchema } from './ProductFromCreateOrConnectWithoutFromUserInputSchema';
import { ProductFromCreateManyFromUserInputEnvelopeSchema } from './ProductFromCreateManyFromUserInputEnvelopeSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';

export const ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema: z.ZodType<Prisma.ProductFromUncheckedCreateNestedManyWithoutFromUserInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default ProductFromUncheckedCreateNestedManyWithoutFromUserInputSchema;
