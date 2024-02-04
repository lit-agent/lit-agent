import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';

export const ProductToScalarWhereInputSchema: z.ZodType<Prisma.ProductToScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToScalarWhereInputSchema),z.lazy(() => ProductToScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export default ProductToScalarWhereInputSchema;
