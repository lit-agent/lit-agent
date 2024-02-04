import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserStatusSchema } from './UserStatusSchema';
import { NestedEnumUserStatusWithAggregatesFilterSchema } from './NestedEnumUserStatusWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumUserStatusFilterSchema } from './NestedEnumUserStatusFilterSchema';

export const EnumUserStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => UserStatusSchema).optional(),
  in: z.lazy(() => UserStatusSchema).array().optional(),
  notIn: z.lazy(() => UserStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => UserStatusSchema),z.lazy(() => NestedEnumUserStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumUserStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumUserStatusFilterSchema).optional()
}).strict();

export default EnumUserStatusWithAggregatesFilterSchema;
