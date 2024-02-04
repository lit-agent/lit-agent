import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PostWhereInputSchema } from './PostWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumPosterSourceFilterSchema } from './EnumPosterSourceFilterSchema';
import { PosterSourceSchema } from './PosterSourceSchema';

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  }),
  z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
  }),
  z.object({
    id: z.string(),
    updatedAt: z.coerce.date(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
  z.object({
    createdAt: z.coerce.date(),
  }),
  z.object({
    updatedAt: z.coerce.date(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  source: z.union([ z.lazy(() => EnumPosterSourceFilterSchema),z.lazy(() => PosterSourceSchema) ]).optional(),
}).strict());

export default PostWhereUniqueInputSchema;
