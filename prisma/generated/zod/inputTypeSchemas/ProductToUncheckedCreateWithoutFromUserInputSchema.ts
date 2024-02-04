import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ProductToUncheckedCreateWithoutFromUserInputSchema: z.ZodType<Prisma.ProductToUncheckedCreateWithoutFromUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  toUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export default ProductToUncheckedCreateWithoutFromUserInputSchema;
