import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromArgsSchema } from "../outputTypeSchemas/ProductFromArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const ProductToSelectSchema: z.ZodType<Prisma.ProductToSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  toUserId: z.boolean().optional(),
  isFavored: z.boolean().optional(),
  inCar: z.boolean().optional(),
  bought: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default ProductToSelectSchema;
