import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PosterSourceSchema } from './PosterSourceSchema';

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  text: z.string(),
  source: z.lazy(() => PosterSourceSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export default PostUncheckedCreateInputSchema;
