import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const BillCreateManyProductInputSchema: z.ZodType<Prisma.BillCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();

export default BillCreateManyProductInputSchema;
