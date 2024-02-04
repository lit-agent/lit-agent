import { z } from 'zod';
import { PosterSourceSchema } from '../inputTypeSchemas/PosterSourceSchema'

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  source: PosterSourceSchema,
  id: z.string().uuid(),
  name: z.string(),
  text: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

export default PostSchema;
