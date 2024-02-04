import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringNullableListFilterSchema } from './StringNullableListFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolNullableFilterSchema } from './BoolNullableFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { ProductToListRelationFilterSchema } from './ProductToListRelationFilterSchema';
import { BillListRelationFilterSchema } from './BillListRelationFilterSchema';

export const ProductFromWhereInputSchema: z.ZodType<Prisma.ProductFromWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductFromWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductFromWhereInputSchema),z.lazy(() => ProductFromWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  fromUserId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  images: z.lazy(() => StringNullableListFilterSchema).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  detail: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  price: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  total: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  isOnsite: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isSelfOperating: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReturnable: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  isReservationRequired: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  fromUser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  toUsers: z.lazy(() => ProductToListRelationFilterSchema).optional(),
  bills: z.lazy(() => BillListRelationFilterSchema).optional()
}).strict();

export default ProductFromWhereInputSchema;
