import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumTaskToStatusFilterSchema } from './NestedEnumTaskToStatusFilterSchema';

export const NestedEnumTaskToStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTaskToStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskToStatusSchema).optional(),
  in: z.lazy(() => TaskToStatusSchema).array().optional(),
  notIn: z.lazy(() => TaskToStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskToStatusSchema),z.lazy(() => NestedEnumTaskToStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskToStatusFilterSchema).optional()
}).strict();

export default NestedEnumTaskToStatusWithAggregatesFilterSchema;
