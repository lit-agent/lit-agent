import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToWhereInputSchema } from '../inputTypeSchemas/ProductToWhereInputSchema'
import { ProductToOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProductToOrderByWithRelationInputSchema'
import { ProductToWhereUniqueInputSchema } from '../inputTypeSchemas/ProductToWhereUniqueInputSchema'

export const ProductToAggregateArgsSchema: z.ZodType<Prisma.ProductToAggregateArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
  orderBy: z.union([ ProductToOrderByWithRelationInputSchema.array(),ProductToOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductToWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default ProductToAggregateArgsSchema;
