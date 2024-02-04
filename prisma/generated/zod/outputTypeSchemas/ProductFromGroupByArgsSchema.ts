import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromWhereInputSchema } from '../inputTypeSchemas/ProductFromWhereInputSchema'
import { ProductFromOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ProductFromOrderByWithAggregationInputSchema'
import { ProductFromScalarFieldEnumSchema } from '../inputTypeSchemas/ProductFromScalarFieldEnumSchema'
import { ProductFromScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ProductFromScalarWhereWithAggregatesInputSchema'

export const ProductFromGroupByArgsSchema: z.ZodType<Prisma.ProductFromGroupByArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithAggregationInputSchema.array(),ProductFromOrderByWithAggregationInputSchema ]).optional(),
  by: ProductFromScalarFieldEnumSchema.array(),
  having: ProductFromScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ProductFromGroupByArgsSchema;
