import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromSelectSchema } from '../inputTypeSchemas/ProductFromSelectSchema';
import { ProductFromIncludeSchema } from '../inputTypeSchemas/ProductFromIncludeSchema';

export const ProductFromArgsSchema: z.ZodType<Prisma.ProductFromDefaultArgs> = z.object({
  select: z.lazy(() => ProductFromSelectSchema).optional(),
  include: z.lazy(() => ProductFromIncludeSchema).optional(),
}).strict();

export default ProductFromArgsSchema;
