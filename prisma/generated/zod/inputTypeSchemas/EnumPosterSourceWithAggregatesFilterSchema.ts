import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PosterSourceSchema } from './PosterSourceSchema';
import { NestedEnumPosterSourceWithAggregatesFilterSchema } from './NestedEnumPosterSourceWithAggregatesFilterSchema';
import { NestedIntFilterSchema } from './NestedIntFilterSchema';
import { NestedEnumPosterSourceFilterSchema } from './NestedEnumPosterSourceFilterSchema';

export const EnumPosterSourceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPosterSourceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPosterSourceFilterSchema).optional()
}).strict();

export default EnumPosterSourceWithAggregatesFilterSchema;
