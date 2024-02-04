import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorWhereUniqueInputSchema } from './HonorWhereUniqueInputSchema';
import { HonorUpdateWithoutUserInputSchema } from './HonorUpdateWithoutUserInputSchema';
import { HonorUncheckedUpdateWithoutUserInputSchema } from './HonorUncheckedUpdateWithoutUserInputSchema';

export const HonorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HonorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HonorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HonorUpdateWithoutUserInputSchema),z.lazy(() => HonorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default HonorUpdateWithWhereUniqueWithoutUserInputSchema;
