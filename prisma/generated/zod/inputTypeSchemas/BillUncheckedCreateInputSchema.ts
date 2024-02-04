import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const BillUncheckedCreateInputSchema: z.ZodType<Prisma.BillUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string(),
  productId: z.string()
}).strict();

export default BillUncheckedCreateInputSchema;
