import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';
import { NestedEnumHonorTypeFilterSchema } from './NestedEnumHonorTypeFilterSchema';

export const EnumHonorTypeFilterSchema: z.ZodType<Prisma.EnumHonorTypeFilter> = z.object({
  equals: z.lazy(() => HonorTypeSchema).optional(),
  in: z.lazy(() => HonorTypeSchema).array().optional(),
  notIn: z.lazy(() => HonorTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => NestedEnumHonorTypeFilterSchema) ]).optional(),
}).strict();

export default EnumHonorTypeFilterSchema;
