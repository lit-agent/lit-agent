import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ProductFromCreateimagesInputSchema: z.ZodType<Prisma.ProductFromCreateimagesInput> = z.object({
  set: z.string().array()
}).strict();

export default ProductFromCreateimagesInputSchema;
