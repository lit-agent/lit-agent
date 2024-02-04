import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorWhereInputSchema } from '../inputTypeSchemas/HonorWhereInputSchema'

export const HonorDeleteManyArgsSchema: z.ZodType<Prisma.HonorDeleteManyArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
}).strict()

export default HonorDeleteManyArgsSchema;
