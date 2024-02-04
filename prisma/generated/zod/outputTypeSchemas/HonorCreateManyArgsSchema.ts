import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorCreateManyInputSchema } from '../inputTypeSchemas/HonorCreateManyInputSchema'

export const HonorCreateManyArgsSchema: z.ZodType<Prisma.HonorCreateManyArgs> = z.object({
  data: z.union([ HonorCreateManyInputSchema,HonorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default HonorCreateManyArgsSchema;
