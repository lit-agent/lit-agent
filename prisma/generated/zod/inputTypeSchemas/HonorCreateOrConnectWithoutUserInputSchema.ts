import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorWhereUniqueInputSchema } from './HonorWhereUniqueInputSchema';
import { HonorCreateWithoutUserInputSchema } from './HonorCreateWithoutUserInputSchema';
import { HonorUncheckedCreateWithoutUserInputSchema } from './HonorUncheckedCreateWithoutUserInputSchema';

export const HonorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HonorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default HonorCreateOrConnectWithoutUserInputSchema;
