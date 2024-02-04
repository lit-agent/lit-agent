import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProductFromRelationFilterSchema } from './ProductFromRelationFilterSchema';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';

export const BillWhereInputSchema: z.ZodType<Prisma.BillWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BillWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BillWhereInputSchema),z.lazy(() => BillWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  product: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
}).strict();

export default BillWhereInputSchema;
