import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorWhereUniqueInputSchema } from './HonorWhereUniqueInputSchema';
import { HonorUpdateWithoutUserInputSchema } from './HonorUpdateWithoutUserInputSchema';
import { HonorUncheckedUpdateWithoutUserInputSchema } from './HonorUncheckedUpdateWithoutUserInputSchema';
import { HonorCreateWithoutUserInputSchema } from './HonorCreateWithoutUserInputSchema';
import { HonorUncheckedCreateWithoutUserInputSchema } from './HonorUncheckedCreateWithoutUserInputSchema';

export const HonorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HonorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HonorUpdateWithoutUserInputSchema),z.lazy(() => HonorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HonorCreateWithoutUserInputSchema),z.lazy(() => HonorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default HonorUpsertWithWhereUniqueWithoutUserInputSchema;
