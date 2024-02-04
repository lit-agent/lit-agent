import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const BillUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.BillUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export default BillUncheckedCreateWithoutProductInputSchema;
