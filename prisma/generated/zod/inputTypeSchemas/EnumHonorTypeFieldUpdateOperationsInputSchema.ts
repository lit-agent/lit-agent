import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';

export const EnumHonorTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumHonorTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => HonorTypeSchema).optional()
}).strict();

export default EnumHonorTypeFieldUpdateOperationsInputSchema;
