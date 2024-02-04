import { z } from 'zod';
import { HonorTypeSchema } from '../inputTypeSchemas/HonorTypeSchema'

/////////////////////////////////////////
// HONOR SCHEMA
/////////////////////////////////////////

export const HonorSchema = z.object({
  id: HonorTypeSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
})

export type Honor = z.infer<typeof HonorSchema>

export default HonorSchema;
