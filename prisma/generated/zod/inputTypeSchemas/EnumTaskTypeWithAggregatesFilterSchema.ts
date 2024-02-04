import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskTypeSchema } from './TaskTypeSchema';
import { NestedEnumTaskTypeWithAggregatesFilterSchema } from './NestedEnumTaskTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumTaskTypeFilterSchema } from './NestedEnumTaskTypeFilterSchema';

export const EnumTaskTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskTypeSchema).optional(),
  in: z.lazy(() => TaskTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskTypeSchema),z.lazy(() => NestedEnumTaskTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskTypeFilterSchema).optional()
}).strict();

export default EnumTaskTypeWithAggregatesFilterSchema;
