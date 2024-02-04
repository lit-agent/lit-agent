import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { BillWhereInputSchema } from './BillWhereInputSchema';

export const BillListRelationFilterSchema: z.ZodType<Prisma.BillListRelationFilter> = z.object({
  every: z.lazy(() => BillWhereInputSchema).optional(),
  some: z.lazy(() => BillWhereInputSchema).optional(),
  none: z.lazy(() => BillWhereInputSchema).optional()
}).strict();

export default BillListRelationFilterSchema;
