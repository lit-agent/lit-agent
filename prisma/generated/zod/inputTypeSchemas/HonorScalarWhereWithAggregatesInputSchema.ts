import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EnumHonorTypeWithAggregatesFilterSchema } from './EnumHonorTypeWithAggregatesFilterSchema';
import { HonorTypeSchema } from './HonorTypeSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const HonorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HonorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HonorScalarWhereWithAggregatesInputSchema),z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorScalarWhereWithAggregatesInputSchema),z.lazy(() => HonorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumHonorTypeWithAggregatesFilterSchema),z.lazy(() => HonorTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default HonorScalarWhereWithAggregatesInputSchema;
