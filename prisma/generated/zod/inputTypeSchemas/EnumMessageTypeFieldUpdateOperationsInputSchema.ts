import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { MessageTypeSchema } from './MessageTypeSchema';

export const EnumMessageTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumMessageTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => MessageTypeSchema).optional()
}).strict();

export default EnumMessageTypeFieldUpdateOperationsInputSchema;
