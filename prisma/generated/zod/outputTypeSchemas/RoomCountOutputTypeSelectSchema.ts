import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const RoomCountOutputTypeSelectSchema: z.ZodType<Prisma.RoomCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  messages: z.boolean().optional(),
}).strict();

export default RoomCountOutputTypeSelectSchema;
