import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProductToFindManyArgsSchema } from "../outputTypeSchemas/ProductToFindManyArgsSchema"
import { BillFindManyArgsSchema } from "../outputTypeSchemas/BillFindManyArgsSchema"
import { ProductFromCountOutputTypeArgsSchema } from "../outputTypeSchemas/ProductFromCountOutputTypeArgsSchema"

export const ProductFromIncludeSchema: z.ZodType<Prisma.ProductFromInclude> = z.object({
  fromUser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  toUsers: z.union([z.boolean(),z.lazy(() => ProductToFindManyArgsSchema)]).optional(),
  bills: z.union([z.boolean(),z.lazy(() => BillFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductFromCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default ProductFromIncludeSchema;
