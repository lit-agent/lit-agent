import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
import { ProductFromArgsSchema } from "../outputTypeSchemas/ProductFromArgsSchema"

export const BillIncludeSchema: z.ZodType<Prisma.BillInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductFromArgsSchema)]).optional(),
}).strict()

export default BillIncludeSchema;
