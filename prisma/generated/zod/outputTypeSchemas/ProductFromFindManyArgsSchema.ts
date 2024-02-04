import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromIncludeSchema } from '../inputTypeSchemas/ProductFromIncludeSchema'
import { ProductFromWhereInputSchema } from '../inputTypeSchemas/ProductFromWhereInputSchema'
import { ProductFromOrderByWithRelationInputSchema } from '../inputTypeSchemas/ProductFromOrderByWithRelationInputSchema'
import { ProductFromWhereUniqueInputSchema } from '../inputTypeSchemas/ProductFromWhereUniqueInputSchema'
import { ProductFromScalarFieldEnumSchema } from '../inputTypeSchemas/ProductFromScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProductToFindManyArgsSchema } from "../outputTypeSchemas/ProductToFindManyArgsSchema"
import { BillFindManyArgsSchema } from "../outputTypeSchemas/BillFindManyArgsSchema"
import { ProductFromCountOutputTypeArgsSchema } from "../outputTypeSchemas/ProductFromCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductFromSelectSchema: z.ZodType<Prisma.ProductFromSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  fromUserId: z.boolean().optional(),
  images: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  detail: z.boolean().optional(),
  price: z.boolean().optional(),
  total: z.boolean().optional(),
  isOnsite: z.boolean().optional(),
  isSelfOperating: z.boolean().optional(),
  isReturnable: z.boolean().optional(),
  isReservationRequired: z.boolean().optional(),
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductFromFindManyArgsSchema: z.ZodType<Prisma.ProductFromFindManyArgs> = z.object({
  select: ProductFromSelectSchema.optional(),
  include: ProductFromIncludeSchema.optional(),
  where: ProductFromWhereInputSchema.optional(),
  orderBy: z.union([ ProductFromOrderByWithRelationInputSchema.array(),ProductFromOrderByWithRelationInputSchema ]).optional(),
  cursor: ProductFromWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductFromScalarFieldEnumSchema,ProductFromScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default ProductFromFindManyArgsSchema;
