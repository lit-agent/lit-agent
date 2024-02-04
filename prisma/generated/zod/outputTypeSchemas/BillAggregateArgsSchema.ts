import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillWhereInputSchema } from '../inputTypeSchemas/BillWhereInputSchema'
import { BillOrderByWithRelationInputSchema } from '../inputTypeSchemas/BillOrderByWithRelationInputSchema'
import { BillWhereUniqueInputSchema } from '../inputTypeSchemas/BillWhereUniqueInputSchema'

export const BillAggregateArgsSchema: z.ZodType<Prisma.BillAggregateArgs> = z.object({
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default BillAggregateArgsSchema;
