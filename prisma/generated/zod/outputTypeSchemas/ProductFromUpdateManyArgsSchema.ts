import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProductFromUpdateManyMutationInputSchema'
import { ProductFromUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProductFromUncheckedUpdateManyInputSchema'
import { ProductFromWhereInputSchema } from '../inputTypeSchemas/ProductFromWhereInputSchema'

export const ProductFromUpdateManyArgsSchema: z.ZodType<Prisma.ProductFromUpdateManyArgs> = z.object({
  data: z.union([ ProductFromUpdateManyMutationInputSchema,ProductFromUncheckedUpdateManyInputSchema ]),
  where: ProductFromWhereInputSchema.optional(),
}).strict()

export default ProductFromUpdateManyArgsSchema;
