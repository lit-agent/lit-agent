import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillIncludeSchema } from '../inputTypeSchemas/BillIncludeSchema'
import { BillCreateInputSchema } from '../inputTypeSchemas/BillCreateInputSchema'
import { BillUncheckedCreateInputSchema } from '../inputTypeSchemas/BillUncheckedCreateInputSchema'
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

export const BillCreateArgsSchema: z.ZodType<Prisma.BillCreateArgs> = z.object({
  select: BillSelectSchema.optional(),
  include: BillIncludeSchema.optional(),
  data: z.union([ BillCreateInputSchema,BillUncheckedCreateInputSchema ]),
}).strict()

export default BillCreateArgsSchema;
