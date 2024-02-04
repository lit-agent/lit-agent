import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';
import { NestedEnumHonorTypeWithAggregatesFilterSchema } from './NestedEnumHonorTypeWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumHonorTypeFilterSchema } from './NestedEnumHonorTypeFilterSchema';

export const EnumHonorTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumHonorTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumHonorTypeFilterSchema).optional()
}).strict();

export default EnumHonorTypeWithAggregatesFilterSchema;
