import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const BillScalarWhereInputSchema: z.ZodType<Prisma.BillScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillScalarWhereInputSchema),z.lazy(() => BillScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default BillScalarWhereInputSchema;
