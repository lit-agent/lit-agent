import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PosterSourceSchema } from './PosterSourceSchema';
import { NestedEnumPosterSourceFilterSchema } from './NestedEnumPosterSourceFilterSchema';

export const EnumPosterSourceFilterSchema: z.ZodType<Prisma.EnumPosterSourceFilter> = z.object({
  equals: z.lazy(() => PosterSourceSchema).optional(),
  in: z.lazy(() => PosterSourceSchema).array().optional(),
  notIn: z.lazy(() => PosterSourceSchema).array().optional(),
  not: z.union([ z.lazy(() => PosterSourceSchema),z.lazy(() => NestedEnumPosterSourceFilterSchema) ]).optional(),
}).strict();

export default EnumPosterSourceFilterSchema;
