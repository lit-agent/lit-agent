import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorWhereInputSchema } from '../inputTypeSchemas/HonorWhereInputSchema'
import { HonorOrderByWithRelationInputSchema } from '../inputTypeSchemas/HonorOrderByWithRelationInputSchema'
import { HonorWhereUniqueInputSchema } from '../inputTypeSchemas/HonorWhereUniqueInputSchema'

export const HonorAggregateArgsSchema: z.ZodType<Prisma.HonorAggregateArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithRelationInputSchema.array(),HonorOrderByWithRelationInputSchema ]).optional(),
  cursor: HonorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default HonorAggregateArgsSchema;
