import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { ProductFromArgsSchema } from "../outputTypeSchemas/ProductFromArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const ProductToIncludeSchema: z.ZodType<Prisma.ProductToInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
  toUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default ProductToIncludeSchema;
