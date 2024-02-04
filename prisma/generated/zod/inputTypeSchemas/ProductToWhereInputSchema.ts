import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { ProductFromRelationFilterSchema } from './ProductFromRelationFilterSchema';
import { ProductFromWhereInputSchema } from './ProductFromWhereInputSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const ProductToWhereInputSchema: z.ZodType<Prisma.ProductToWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductToWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductToWhereInputSchema),z.lazy(() => ProductToWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  toUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isFavored: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  inCar: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bought: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  fromUser: z.union([ z.lazy(() => ProductFromRelationFilterSchema),z.lazy(() => ProductFromWhereInputSchema) ]).optional(),
  toUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default ProductToWhereInputSchema;
