import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToUpdateManyMutationInputSchema } from '../inputTypeSchemas/ProductToUpdateManyMutationInputSchema'
import { ProductToUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/ProductToUncheckedUpdateManyInputSchema'
import { ProductToWhereInputSchema } from '../inputTypeSchemas/ProductToWhereInputSchema'

export const ProductToUpdateManyArgsSchema: z.ZodType<Prisma.ProductToUpdateManyArgs> = z.object({
  data: z.union([ ProductToUpdateManyMutationInputSchema,ProductToUncheckedUpdateManyInputSchema ]),
  where: ProductToWhereInputSchema.optional(),
}).strict()

export default ProductToUpdateManyArgsSchema;
