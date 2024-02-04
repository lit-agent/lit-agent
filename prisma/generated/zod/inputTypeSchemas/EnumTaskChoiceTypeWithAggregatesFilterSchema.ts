import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';
import { NestedEnumTaskChoiceTypeWithAggregatesFilterSchema } from './NestedEnumTaskChoiceTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumTaskChoiceTypeFilterSchema } from './NestedEnumTaskChoiceTypeFilterSchema';

export const EnumTaskChoiceTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTaskChoiceTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => TaskChoiceTypeSchema).optional(),
  in: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  notIn: z.lazy(() => TaskChoiceTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => TaskChoiceTypeSchema),z.lazy(() => NestedEnumTaskChoiceTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumTaskChoiceTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumTaskChoiceTypeFilterSchema).optional()
}).strict();

export default EnumTaskChoiceTypeWithAggregatesFilterSchema;
