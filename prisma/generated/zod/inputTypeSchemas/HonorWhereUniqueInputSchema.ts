import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';
import { HonorWhereInputSchema } from './HonorWhereInputSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { UserRelationFilterSchema } from './UserRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const HonorWhereUniqueInputSchema: z.ZodType<Prisma.HonorWhereUniqueInput> = z.object({
  id: z.lazy(() => HonorTypeSchema)
})
.and(z.object({
  id: z.lazy(() => HonorTypeSchema).optional(),
  AND: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HonorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HonorWhereInputSchema),z.lazy(() => HonorWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export default HonorWhereUniqueInputSchema;
