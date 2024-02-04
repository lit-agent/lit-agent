import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorCreateWithoutUserInputSchema } from './HonorCreateWithoutUserInputSchema';
import { HonorUncheckedCreateWithoutUserInputSchema } from './HonorUncheckedCreateWithoutUserInputSchema';
import { HonorCreateOrConnectWithoutUserInputSchema } from './HonorCreateOrConnectWithoutUserInputSchema';
import { HonorCreateManyUserInputEnvelopeSchema } from './HonorCreateManyUserInputEnvelopeSchema';
import { HonorWhereUniqueInputSchema } from './HonorWhereUniqueInputSchema';

export const HonorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HonorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorCreateWithoutUserInputSchema).array(),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema),z.lazy(() => HonorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HonorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HonorWhereUniqueInputSchema),z.lazy(() => HonorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default HonorUncheckedCreateNestedManyWithoutUserInputSchema;
