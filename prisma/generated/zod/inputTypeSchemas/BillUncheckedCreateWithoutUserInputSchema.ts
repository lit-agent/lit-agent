import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const BillUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BillUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export default BillUncheckedCreateWithoutUserInputSchema;
