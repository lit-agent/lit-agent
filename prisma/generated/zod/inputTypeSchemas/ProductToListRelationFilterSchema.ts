import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereInputSchema } from './ProductToWhereInputSchema';

export const ProductToListRelationFilterSchema: z.ZodType<Prisma.ProductToListRelationFilter> = z.object({
  every: z.lazy(() => ProductToWhereInputSchema).optional(),
  some: z.lazy(() => ProductToWhereInputSchema).optional(),
  none: z.lazy(() => ProductToWhereInputSchema).optional()
}).strict();

export default ProductToListRelationFilterSchema;
