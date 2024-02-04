import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { ProductToWhereInputSchema } from './ProductToWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { ProductFromRelationFilterSchema } from './ProductFromRelationFilterSchema';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const ProductToWhereUniqueInputSchema: z.ZodType<Prisma.ProductToWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromUser: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default ProductToWhereUniqueInputSchema;
