import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromWhereInputSchema } from '../inputTypeSchemas/ProductFromWhereInputSchema'

export const ProductFromDeleteManyArgsSchema: z.ZodType<Prisma.ProductFromDeleteManyArgs> = z.object({
  where: ProductFromWhereInputSchema.optional(),
}).strict()

export default ProductFromDeleteManyArgsSchema;
