import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EnumHonorTypeFilterSchema } from './EnumHonorTypeFilterSchema';
import { HonorTypeSchema } from './HonorTypeSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const HonorScalarWhereInputSchema: z.ZodType<Prisma.HonorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorScalarWhereInputSchema),z.lazy(() => HonorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => EnumHonorTypeFilterSchema),z.lazy(() => HonorTypeSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default HonorScalarWhereInputSchema;
