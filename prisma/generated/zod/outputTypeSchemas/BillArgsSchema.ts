import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { BillSelectSchema } from '../inputTypeSchemas/BillSelectSchema';
import { BillIncludeSchema } from '../inputTypeSchemas/BillIncludeSchema';

export const BillArgsSchema: z.ZodType<Prisma.BillDefaultArgs> = z.object({
  select: z.lazy(() => BillSelectSchema).optional(),
  include: z.lazy(() => BillIncludeSchema).optional(),
}).strict();

export default BillArgsSchema;
