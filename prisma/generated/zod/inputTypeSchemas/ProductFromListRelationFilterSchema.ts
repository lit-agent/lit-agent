import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';

export const ProductFromListRelationFilterSchema: z.ZodType<Prisma.ProductFromListRelationFilter> = z.object({
  every: z.lazy(() => ProductFromWhereInputSchema).optional(),
  some: z.lazy(() => ProductFromWhereInputSchema).optional(),
  none: z.lazy(() => ProductFromWhereInputSchema).optional()
}).strict();

export default ProductFromListRelationFilterSchema;
