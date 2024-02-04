import type { Prisma } from '@prisma/client';
import { z } from 'zod';

export const RoomCreateManyInputSchema: z.ZodType<Prisma.RoomCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable()
}).strict();

export default RoomCreateManyInputSchema;
