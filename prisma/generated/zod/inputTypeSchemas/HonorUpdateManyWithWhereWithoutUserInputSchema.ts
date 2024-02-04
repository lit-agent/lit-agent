import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorScalarWhereInputSchema } from './HonorScalarWhereInputSchema';
import { HonorUpdateManyMutationInputSchema } from './HonorUpdateManyMutationInputSchema';
import { HonorUncheckedUpdateManyWithoutUserInputSchema } from './HonorUncheckedUpdateManyWithoutUserInputSchema';

export const HonorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HonorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => HonorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HonorUpdateManyMutationInputSchema),z.lazy(() => HonorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default HonorUpdateManyWithWhereWithoutUserInputSchema;
