import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';

export const ProductToScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductToScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductToScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export default ProductToScalarWhereWithAggregatesInputSchema;
