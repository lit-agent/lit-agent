import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillWhereInputSchema } from '../inputTypeSchemas/BillWhereInputSchema'
import { BillOrderByWithAggregationInputSchema } from '../inputTypeSchemas/BillOrderByWithAggregationInputSchema'
import { BillScalarFieldEnumSchema } from '../inputTypeSchemas/BillScalarFieldEnumSchema'
import { BillScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/BillScalarWhereWithAggregatesInputSchema'

export const BillGroupByArgsSchema: z.ZodType<Prisma.BillGroupByArgs> = z.object({
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithAggregationInputSchema.array(),BillOrderByWithAggregationInputSchema ]).optional(),
  by: BillScalarFieldEnumSchema.array(),
  having: BillScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default BillGroupByArgsSchema;
