import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorUpdateManyMutationInputSchema } from '../inputTypeSchemas/HonorUpdateManyMutationInputSchema'
import { HonorUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/HonorUncheckedUpdateManyInputSchema'
import { HonorWhereInputSchema } from '../inputTypeSchemas/HonorWhereInputSchema'

export const HonorUpdateManyArgsSchema: z.ZodType<Prisma.HonorUpdateManyArgs> = z.object({
  data: z.union([ HonorUpdateManyMutationInputSchema,HonorUncheckedUpdateManyInputSchema ]),
  where: HonorWhereInputSchema.optional(),
}).strict()

export default HonorUpdateManyArgsSchema;
