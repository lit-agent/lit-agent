import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillIncludeSchema } from '../inputTypeSchemas/BillIncludeSchema'
import { BillWhereInputSchema } from '../inputTypeSchemas/BillWhereInputSchema'
import { BillOrderByWithRelationInputSchema } from '../inputTypeSchemas/BillOrderByWithRelationInputSchema'
import { BillWhereUniqueInputSchema } from '../inputTypeSchemas/BillWhereUniqueInputSchema'
import { BillScalarFieldEnumSchema } from '../inputTypeSchemas/BillScalarFieldEnumSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProductFromArgsSchema } from "../outputTypeSchemas/ProductFromArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const BillSelectSchema: z.ZodType<Prisma.BillSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  productId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
}).strict()

export const BillFindFirstArgsSchema: z.ZodType<Prisma.BillFindFirstArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  where: BillWhereInputSchema.optional(),
  orderBy: z.union([ BillOrderByWithRelationInputSchema.array(),BillOrderByWithRelationInputSchema ]).optional(),
  cursor: BillWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BillScalarFieldEnumSchema,BillScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export default BillFindFirstArgsSchema;
