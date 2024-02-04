import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { PosterSourceSchema } from './PosterSourceSchema';

export const EnumPosterSourceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPosterSourceFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PosterSourceSchema).optional()
}).strict();

export default EnumPosterSourceFieldUpdateOperationsInputSchema;
