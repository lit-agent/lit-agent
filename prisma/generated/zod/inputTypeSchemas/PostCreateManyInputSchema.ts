import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PosterSourceSchema } from './PosterSourceSchema';

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  text: z.string(),
  source: z.lazy(() => PosterSourceSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default PostCreateManyInputSchema;
