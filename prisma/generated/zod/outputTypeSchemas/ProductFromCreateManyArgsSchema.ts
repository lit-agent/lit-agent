import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromCreateManyInputSchema } from '../inputTypeSchemas/ProductFromCreateManyInputSchema'

export const ProductFromCreateManyArgsSchema: z.ZodType<Prisma.ProductFromCreateManyArgs> = z.object({
  data: z.union([ ProductFromCreateManyInputSchema,ProductFromCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default ProductFromCreateManyArgsSchema;
