import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateWithoutToUserInputSchema } from './ProductToCreateWithoutToUserInputSchema';
import { ProductToUncheckedCreateWithoutToUserInputSchema } from './ProductToUncheckedCreateWithoutToUserInputSchema';
import { ProductToCreateOrConnectWithoutToUserInputSchema } from './ProductToCreateOrConnectWithoutToUserInputSchema';
import { ProductToUpsertWithWhereUniqueWithoutToUserInputSchema } from './ProductToUpsertWithWhereUniqueWithoutToUserInputSchema';
import { ProductToCreateManyToUserInputEnvelopeSchema } from './ProductToCreateManyToUserInputEnvelopeSchema';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithWhereUniqueWithoutToUserInputSchema } from './ProductToUpdateWithWhereUniqueWithoutToUserInputSchema';
import { ProductToUpdateManyWithWhereWithoutToUserInputSchema } from './ProductToUpdateManyWithWhereWithoutToUserInputSchema';
import { ProductToScalarWhereInputSchema } from './ProductToScalarWhereInputSchema';

export const ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema: z.ZodType<Prisma.ProductToUncheckedUpdateManyWithoutToUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutToUserInputSchema),z.lazy(() => ProductToCreateWithoutToUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutToUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutToUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyToUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutToUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutToUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProductToUncheckedUpdateManyWithoutToUserNestedInputSchema;
