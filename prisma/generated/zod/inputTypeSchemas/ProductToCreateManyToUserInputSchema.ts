import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const ProductToCreateManyToUserInputSchema: z.ZodType<Prisma.ProductToCreateManyToUserInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  fromUserId: z.string(),
  isFavored: z.boolean().optional(),
  inCar: z.number().int().optional(),
  bought: z.number().int().optional()
}).strict();

export default ProductToCreateManyToUserInputSchema;
