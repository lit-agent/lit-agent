import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductToIncludeSchema } from '../inputTypeSchemas/ProductToIncludeSchema'
import { ProductToWhereUniqueInputSchema } from '../inputTypeSchemas/ProductToWhereUniqueInputSchema'
import { ProductFromArgsSchema } from "../outputTypeSchemas/ProductFromArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

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

export const ProductToFindUniqueArgsSchema: z.ZodType<Prisma.ProductToFindUniqueArgs> = z.object({
  select: ProductToSelectSchema.optional(),
  include: ProductToIncludeSchema.optional(),
  where: ProductToWhereUniqueInputSchema,
}).strict()

export default ProductToFindUniqueArgsSchema;
