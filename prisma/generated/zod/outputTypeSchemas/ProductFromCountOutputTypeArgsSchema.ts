import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromCountOutputTypeSelectSchema } from './ProductFromCountOutputTypeSelectSchema';

export const ProductFromCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductFromCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductFromCountOutputTypeSelectSchema).nullish(),
}).strict();

export default ProductFromCountOutputTypeSelectSchema;
