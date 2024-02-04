import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToSelectSchema } from '../inputTypeSchemas/ProductToSelectSchema';
import { ProductToIncludeSchema } from '../inputTypeSchemas/ProductToIncludeSchema';

export const ProductToArgsSchema: z.ZodType<Prisma.ProductToDefaultArgs> = z.object({
  select: z.lazy(() => ProductToSelectSchema).optional(),
  include: z.lazy(() => ProductToIncludeSchema).optional(),
}).strict();

export default ProductToArgsSchema;
