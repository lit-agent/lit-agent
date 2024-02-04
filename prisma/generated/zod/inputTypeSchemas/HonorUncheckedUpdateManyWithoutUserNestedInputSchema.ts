import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorCreateWithoutUserInputSchema } from './HonorCreateWithoutUserInputSchema';
import { HonorUncheckedCreateWithoutUserInputSchema } from './HonorUncheckedCreateWithoutUserInputSchema';
import { HonorCreateOrConnectWithoutUserInputSchema } from './HonorCreateOrConnectWithoutUserInputSchema';
import { HonorUpsertWithWhereUniqueWithoutUserInputSchema } from './HonorUpsertWithWhereUniqueWithoutUserInputSchema';
import { HonorCreateManyUserInputEnvelopeSchema } from './HonorCreateManyUserInputEnvelopeSchema';
import { HonorWhereUniqueInputSchema } from './HonorWhereUniqueInputSchema';
import { HonorUpdateWithWhereUniqueWithoutUserInputSchema } from './HonorUpdateWithWhereUniqueWithoutUserInputSchema';
import { HonorUpdateManyWithWhereWithoutUserInputSchema } from './HonorUpdateManyWithWhereWithoutUserInputSchema';
import { HonorScalarWhereInputSchema } from './HonorScalarWhereInputSchema';

export const HonorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HonorUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HonorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HonorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default HonorUncheckedUpdateManyWithoutUserNestedInputSchema;
