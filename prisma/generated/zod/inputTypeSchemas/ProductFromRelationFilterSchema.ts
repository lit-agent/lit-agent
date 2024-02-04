import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';

export const ProductFromRelationFilterSchema: z.ZodType<Prisma.ProductFromRelationFilter> = z.object({
  is: z.lazy(() => ProductFromWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export default ProductFromRelationFilterSchema;
