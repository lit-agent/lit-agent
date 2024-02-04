import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToWhereInputSchema } from '../inputTypeSchemas/ProductToWhereInputSchema'

export const ProductToDeleteManyArgsSchema: z.ZodType<Prisma.ProductToDeleteManyArgs> = z.object({
  where: ProductToWhereInputSchema.optional(),
}).strict()

export default ProductToDeleteManyArgsSchema;
