import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToCreateWithoutFromUserInputSchema } from './ProductToCreateWithoutFromUserInputSchema';
import { ProductToUncheckedCreateWithoutFromUserInputSchema } from './ProductToUncheckedCreateWithoutFromUserInputSchema';
import { ProductToCreateOrConnectWithoutFromUserInputSchema } from './ProductToCreateOrConnectWithoutFromUserInputSchema';
import { ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema } from './ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema';
import { ProductToCreateManyFromUserInputEnvelopeSchema } from './ProductToCreateManyFromUserInputEnvelopeSchema';
import { ProductToWhereUniqueInputSchema } from './ProductToWhereUniqueInputSchema';
import { ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema } from './ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema';
import { ProductToUpdateManyWithWhereWithoutFromUserInputSchema } from './ProductToUpdateManyWithWhereWithoutFromUserInputSchema';
import { ProductToScalarWhereInputSchema } from './ProductToScalarWhereInputSchema';

export const ProductToUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductToUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductToCreateWithoutFromUserInputSchema),z.lazy(() => ProductToCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductToUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductToCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductToCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductToWhereUniqueInputSchema),z.lazy(() => ProductToWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductToUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProductToUpdateManyWithoutFromUserNestedInputSchema;
