import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const BillCreateManyInputSchema: z.ZodType<Prisma.BillCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export default BillCreateManyInputSchema;
