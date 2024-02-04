import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToCreateManyInputSchema } from '../inputTypeSchemas/ProductToCreateManyInputSchema'

export const ProductToCreateManyArgsSchema: z.ZodType<Prisma.ProductToCreateManyArgs> = z.object({
  data: z.union([ ProductToCreateManyInputSchema,ProductToCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ProductToCreateManyArgsSchema;
