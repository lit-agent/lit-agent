import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromWhereInputSchema } from '../inputTypeSchemas/ProductFromWhereInputSchema'
import { ProductFromOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProductFromOrderByWithRelationInputSchema'
import { ProductFromWhereUniqueInputSchema } from '../inputTypeSchemas/ProductFromWhereUniqueInputSchema'

export const ProductFromAggregateArgsSchema: z.ZodType<Prisma.ProductFromAggregateArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ProductFromAggregateArgsSchema;
