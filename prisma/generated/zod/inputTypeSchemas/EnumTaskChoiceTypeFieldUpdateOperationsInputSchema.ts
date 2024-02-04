import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskChoiceTypeSchema } from './TaskChoiceTypeSchema';

export const EnumTaskChoiceTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskChoiceTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskChoiceTypeSchema).optional()
}).strict();

export default EnumTaskChoiceTypeFieldUpdateOperationsInputSchema;
