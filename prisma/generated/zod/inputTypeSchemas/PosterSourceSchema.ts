import { z } from 'zod';

export const PosterSourceSchema = z.enum(['RAW','GITHUB']);

export type PosterSourceType = `${z.infer<typeof PosterSourceSchema>}`

export default PosterSourceSchema;
