import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const BillOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BillOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default BillOrderByRelationAggregateInputSchema;
