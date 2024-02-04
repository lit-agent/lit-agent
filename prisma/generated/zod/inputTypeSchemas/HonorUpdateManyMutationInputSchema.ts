import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { HonorTypeSchema } from './HonorTypeSchema';
import { EnumHonorTypeFieldUpdateOperationsInputSchema } from './EnumHonorTypeFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';

export const HonorUpdateManyMutationInputSchema: z.ZodType<Prisma.HonorUpdateManyMutationInput> = z.object({
  id: z.union([ z.lazy(() => HonorTypeSchema),z.lazy(() => EnumHonorTypeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default HonorUpdateManyMutationInputSchema;
