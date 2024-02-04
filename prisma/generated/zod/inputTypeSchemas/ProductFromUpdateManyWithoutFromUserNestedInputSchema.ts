import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromCreateWithoutFromUserInputSchema } from './ProductFromCreateWithoutFromUserInputSchema';
import { ProductFromUncheckedCreateWithoutFromUserInputSchema } from './ProductFromUncheckedCreateWithoutFromUserInputSchema';
import { ProductFromCreateOrConnectWithoutFromUserInputSchema } from './ProductFromCreateOrConnectWithoutFromUserInputSchema';
import { ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema } from './ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema';
import { ProductFromCreateManyFromUserInputEnvelopeSchema } from './ProductFromCreateManyFromUserInputEnvelopeSchema';
import { ProductFromWhereUniqueInputSchema } from './ProductFromWhereUniqueInputSchema';
import { ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema } from './ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema';
import { ProductFromUpdateManyWithWhereWithoutFromUserInputSchema } from './ProductFromUpdateManyWithWhereWithoutFromUserInputSchema';
import { ProductFromScalarWhereInputSchema } from './ProductFromScalarWhereInputSchema';

export const ProductFromUpdateManyWithoutFromUserNestedInputSchema: z.ZodType<Prisma.ProductFromUpdateManyWithoutFromUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductFromCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateWithoutFromUserInputSchema).array(),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema),z.lazy(() => ProductFromUncheckedCreateWithoutFromUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema),z.lazy(() => ProductFromCreateOrConnectWithoutFromUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpsertWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductFromCreateManyFromUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductFromWhereUniqueInputSchema),z.lazy(() => ProductFromWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateWithWhereUniqueWithoutFromUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema),z.lazy(() => ProductFromUpdateManyWithWhereWithoutFromUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductFromScalarWhereInputSchema),z.lazy(() => ProductFromScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default ProductFromUpdateManyWithoutFromUserNestedInputSchema;
