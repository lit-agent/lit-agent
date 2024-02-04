import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const ProductFromCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductFromCountOutputTypeSelect> = z.object({
  toUsers: z.boolean().optional(),
  bills: z.boolean().optional(),
}).strict();

export default ProductFromCountOutputTypeSelectSchema;
