import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';

export const BillScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BillScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BillScalarWhereWithAggregatesInputSchema),z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillScalarWhereWithAggregatesInputSchema),z.lazy(() => BillScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default BillScalarWhereWithAggregatesInputSchema;
