import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToWhereInputSchema } from '../inputTypeSchemas/ProductToWhereInputSchema'
import { ProductToOrderByWithAggregationInputSchema } from '../inputTypeSchemas/ProductToOrderByWithAggregationInputSchema'
import { ProductToScalarFieldEnumSchema } from '../inputTypeSchemas/ProductToScalarFieldEnumSchema'
import { ProductToScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/ProductToScalarWhereWithAggregatesInputSchema'

export const ProductToGroupByArgsSchema: z.ZodType<Prisma.ProductToGroupByArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithAggregationInputSchema.array(),ProductToOrderByWithAggregationInputSchema ]).optional(),
  by: ProductToScalarFieldEnumSchema.array(),
  having: ProductToScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ProductToGroupByArgsSchema;
