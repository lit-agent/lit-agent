import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { HonorWhereInputSchema } from '../inputTypeSchemas/HonorWhereInputSchema'
import { HonorOrderByWithAggregationInputSchema } from '../inputTypeSchemas/HonorOrderByWithAggregationInputSchema'
import { HonorScalarFieldEnumSchema } from '../inputTypeSchemas/HonorScalarFieldEnumSchema'
import { HonorScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/HonorScalarWhereWithAggregatesInputSchema'

export const HonorGroupByArgsSchema: z.ZodType<Prisma.HonorGroupByArgs> = z.object({
  where: HonorWhereInputSchema.optional(),
  orderBy: z.union([ HonorOrderByWithAggregationInputSchema.array(),HonorOrderByWithAggregationInputSchema ]).optional(),
  by: HonorScalarFieldEnumSchema.array(),
  having: HonorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default HonorGroupByArgsSchema;
