import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { TaskToStatusSchema } from './TaskToStatusSchema';

export const EnumTaskToStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTaskToStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => TaskToStatusSchema).optional()
}).strict();

export default EnumTaskToStatusFieldUpdateOperationsInputSchema;
