import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { UserTypeSchema } from './UserTypeSchema';

export const EnumUserTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => UserTypeSchema).optional()
}).strict();

export default EnumUserTypeFieldUpdateOperationsInputSchema;
